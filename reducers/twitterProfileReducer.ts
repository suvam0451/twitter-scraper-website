export type twitterProfileStore = {
  profileIds: number[]
  profileMeta: {
    id: number
    username: string
    name: string
  }[]
  nsfwLinks: ITwitterMediaLinkMeta[]
  sfwLinks: ITwitterMediaLinkMeta[]
}

export type ITwitterMediaLinkMeta = {
  media_key: string
  type: string
  url?: string
}

export enum TWITTER_STORE_ACTION {
  ADD_USER_TO_FAVOURITES,
  ADD_USER_TO_SEARCH_RESULT,
  ADD_IMAGES_TO_GALLERY,
}

export type IAction =
  | {
      type: TWITTER_STORE_ACTION.ADD_USER_TO_FAVOURITES
      payload: {
        id: number
        username: string
        name: string
      }
    }
  | {
      type: TWITTER_STORE_ACTION.ADD_USER_TO_SEARCH_RESULT
      payload: {
        id: number
        username: string
        name: string
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
    case TWITTER_STORE_ACTION.ADD_USER_TO_FAVOURITES: {
      const { id, username, name } = action.payload
      console.log('twitter store', state)
      if (state.profileIds.find((o) => o === id)) return state

      const newState = {
        ...state,
        profileIds: state.profileIds.concat([id]),
        profileMeta: state.profileMeta.concat([
          {
            id,
            username,
            name,
          },
        ]),
      }
      return newState
    }
    case TWITTER_STORE_ACTION.ADD_USER_TO_SEARCH_RESULT: {
      return state
    }
    case TWITTER_STORE_ACTION.ADD_IMAGES_TO_GALLERY: {
      console.log(action.payload)

      const { nsfw, sfw } = action.payload.data
      console.log('tests', nsfw, sfw, nsfw[0])

      if (!nsfw || !sfw) return state

      console.log('setting new state', action.payload)
      const newState = {
        ...state,
        nsfwLinks: nsfw,
        sfwLinks: sfw,
      }
      console.log('set new state', newState)
      return newState
    }
  }
}
