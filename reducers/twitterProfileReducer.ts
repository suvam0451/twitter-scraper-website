import { setSearchHistory } from '../services/local-search-history.service'

export type twitterProfileStore = {
  profileIds: number[]
  profileMeta: {
    id: number
    username: string
    name: string
    likeRatio: number // 0-100 (% of liked images)
  }[]
  nsfwLinks: ITwitterMediaLinkMeta[]
  sfwLinks: ITwitterMediaLinkMeta[]
  curretUser?: {
    id: number
    username: string
    name: string
    likeRatio: number // 0-100 (% of liked images)
  }
}

export type ITwitterMediaLinkMeta = {
  media_key: string
  type: string
  url?: string
  liked: boolean
  downloaded: boolean
}

export enum TWITTER_STORE_ACTION {
  ADD_USER_TO_FAVOURITES,
  REMOVE_USER_FROM_FAVOURITES,
  ADD_USER_TO_SEARCH_RESULT,
  ADD_IMAGES_TO_GALLERY,
  LIKE_IMAGE,
  SET_DOWNLOAD_FLAG_TRUE,
  SELECT_USER,
  UNLIKE_IMAGE,
}

export type IAction =
  | {
      type: TWITTER_STORE_ACTION.ADD_USER_TO_FAVOURITES
      payload: {
        id: number
        username: string
        name: string
        likeRatio?: number
      }
    }
  | {
      type: TWITTER_STORE_ACTION.REMOVE_USER_FROM_FAVOURITES
      payload: {
        index: number
      }
    }
  | {
      type: TWITTER_STORE_ACTION.ADD_USER_TO_SEARCH_RESULT
      payload: {
        id: number
        username: string
        name: string
        likeRatio?: number
      }
    }
  | {
      type: TWITTER_STORE_ACTION.ADD_IMAGES_TO_GALLERY
      payload: {
        data: {
          nsfw: ITwitterMediaLinkMeta[]
          sfw: ITwitterMediaLinkMeta[]
        }
      }
    }
  | {
      type: TWITTER_STORE_ACTION.LIKE_IMAGE
      payload: {
        itemIndex: number
      }
    }
  | {
      type: TWITTER_STORE_ACTION.UNLIKE_IMAGE
      payload: {
        itemIndex: number
      }
    }
  | {
      type: TWITTER_STORE_ACTION.SELECT_USER
      payload: {
        id: number
      }
    }
  | {
      type: TWITTER_STORE_ACTION.SET_DOWNLOAD_FLAG_TRUE
      payload: {
        itemIndex: number
      }
    }

export const initialState: twitterProfileStore = {
  profileIds: [],
  profileMeta: [],
  nsfwLinks: [],
  sfwLinks: [],
}

export const reducer = (
  state: twitterProfileStore,
  action: IAction
): twitterProfileStore => {
  switch (action.type) {
    // add user on screen (and store him as historical searches)
    case TWITTER_STORE_ACTION.ADD_USER_TO_FAVOURITES: {
      const { id, username, name } = action.payload
      setSearchHistory('r34s_twitter_account_history', username)
      if (state.profileIds.find((o) => o === id)) return state
      const newState = {
        ...state,
        profileIds: state.profileIds.concat([id]),
        profileMeta: state.profileMeta.concat([
          {
            id,
            username,
            name,
            likeRatio: 0,
          },
        ]),
      }
      return newState
    }
    case TWITTER_STORE_ACTION.SET_DOWNLOAD_FLAG_TRUE: {
      const { itemIndex } = action.payload
      const obj = state
      obj.nsfwLinks[itemIndex].downloaded = !obj.nsfwLinks[itemIndex].downloaded
      return obj
    }
    case TWITTER_STORE_ACTION.REMOVE_USER_FROM_FAVOURITES: {
      const { index } = action.payload
      const obj = state
      obj.profileIds.splice(index, 1)
      obj.profileMeta.splice(index, 1)
      return obj
    }
    case TWITTER_STORE_ACTION.ADD_USER_TO_SEARCH_RESULT: {
      return state
    }
    case TWITTER_STORE_ACTION.SELECT_USER: {
      const { id } = action.payload
      return {
        ...state,
        curretUser: state.profileMeta.find((o) => o.id === id),
      }
    }

    case TWITTER_STORE_ACTION.LIKE_IMAGE: {
      const { itemIndex } = action.payload
      const obj = state
      obj.nsfwLinks[itemIndex].liked = true
      return obj
    }
    case TWITTER_STORE_ACTION.UNLIKE_IMAGE: {
      const { itemIndex } = action.payload
      const obj = state
      obj.nsfwLinks[itemIndex].liked = false
      return obj
    }

    case TWITTER_STORE_ACTION.ADD_IMAGES_TO_GALLERY: {
      const { nsfw, sfw } = action.payload.data
      if (!nsfw || !sfw) return state
      const newState = {
        ...state,
        nsfwLinks: nsfw.map(({ media_key, type, url }) => ({
          media_key,
          type,
          url,
          liked: false,
          downloaded: false,
        })),
        sfwLinks: sfw.map(({ media_key, type, url }) => ({
          media_key,
          type,
          url,
          liked: false,
          downloaded: false,
        })),
      }
      return newState
    }
  }
}
