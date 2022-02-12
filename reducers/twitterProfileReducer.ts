export type twitterProfileStore = {
  profileIds: number[]
  profileMeta: {
    id: number
    username: string
    name: string
  }[]
}

export enum TWITTER_STORE_ACTION {
  ADD_USER_TO_FAVOURITES,
  ADD_USER_TO_SEARCH_RESULT,
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

export const initialState: twitterProfileStore = {
  profileIds: [],
  profileMeta: [],
}

export const reducer = (
  state: twitterProfileStore,
  action: IAction
): twitterProfileStore => {
  switch (action.type) {
    case TWITTER_STORE_ACTION.ADD_USER_TO_FAVOURITES: {
      const { id, username, name } = action.payload
      console.log("twitter store", state);
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
      console.log(action)
      return state
    }
  }
}
