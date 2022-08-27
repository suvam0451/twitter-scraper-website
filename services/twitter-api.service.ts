import axios from 'axios'
import dotenv from 'dotenv'
import { ITwitterMediaLinkMeta } from '../reducers/twitterProfileReducer'
import { UserMetaData, UserTweetsResponse } from '../types/twitter'
import { getRequest } from './backend.service'

dotenv.config({ path: './.env.local' })

const DEFAULT_TWEET_LIMIT = 200
const DEFAULT_TWEETS_PER_PAGE = 100

type IResponse = {
  data: {
    nsfw: ITwitterMediaLinkMeta[]
    sfw: ITwitterMediaLinkMeta[]
  }
}

export const fetchPostsForUserId = async (id: number) => {
  return await getRequest<IResponse>(`/twitter/posts?q=${id.toString()}`)
}

export const MakeClient = () =>
  axios.create({
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_API_CRED}`,
    },
    baseURL: 'https://api.twitter.com/2',
  })

export const searchUsername = async (query: string) => {
  const res = await MakeClient().get<UserMetaData>(
    `/users/by/username/${query}`
  )
  console.log(res)
  return res.data.data
}

export const fetchNextBatchTweets = async (
  id: string,
  refresh_token?: string
) => {
  let tweetSet = await MakeClient().get<UserTweetsResponse>(
    `/users/${id}/tweets?max_results=100&tweet.fields=possibly_sensitive${
      refresh_token == '' ? '' : `&pagination_token=${refresh_token}`
    }`
  )

  let { data, meta } = tweetSet.data
  const stripMetadata = data.map((ele) => ({
    id: ele.id,
    possiblySensitive: ele.possibly_sensitive,
  }))
  return { data: stripMetadata, refreshToken: meta.next_token }
}

/**
 *  fetch raw image links for asset id's
 *  recommend splitting queries in batches of 20s
 *  (since it is a single query)
 */
export const resolveImages = async (arr: string[]) => {
  let retval: string[] = []
  const tweet_ids_query = arr.reduce(
    (prev, curr, idx, entry) => prev + ',' + curr
  )
  let res = await MakeClient()
    .get(
      `/tweets?ids=${tweet_ids_query}&media.fields=url&expansions=attachments.media_keys`
    )
    .catch((err) => {
      console.log(err)
    })
  if (res) {
    if (res.data.includes) {
      retval.push(res.data.includes.media.map((ele: any) => ele.url))
    }
  }
  return retval
}

export const fetchImagesForUsername = async (query: string) => {
  let _refreshToken = ''
  let tweet_count = 0
  let sfwLinks: string[] = [],
    nsfwLinks: string[] = []

  do {
    let { data, refreshToken } = await fetchNextBatchTweets(
      query,
      _refreshToken
    )
    let sfw = data.filter((ele) => !ele.possiblySensitive).map((ele) => ele.id)
    let nsfw = data.filter((ele) => ele.possiblySensitive).map((ele) => ele.id)

    // concat results
    sfwLinks.push(...sfw)
    nsfwLinks.push(...nsfw)
    tweet_count += DEFAULT_TWEETS_PER_PAGE
    _refreshToken = refreshToken
  } while (_refreshToken !== '' && tweet_count < DEFAULT_TWEET_LIMIT)

  return {
    sfw: sfwLinks,
    nsfw: nsfwLinks,
  }
}
