import {
  useReducer,
  createContext,
  useContext,
  useMemo,
  Reducer,
  Dispatch,
} from 'react'
import { reducer, initialState } from '../reducers/twitterProfileReducer'
import type {
  twitterProfileStore,
  IAction,
} from '../reducers/twitterProfileReducer'

type IContext = {
  state: twitterProfileStore
  dispatch: Dispatch<IAction>
}

const Context = createContext<Partial<IContext>>({
  state: initialState,
})

const Provider = ({ children }: any) => {
  const [state, dispatch] = useReducer<
    Reducer<twitterProfileStore, IAction>,
    twitterProfileStore
  >(reducer, initialState, (e) => e)
  const contextValue = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

export const useTwitterStateContext = () => useContext(Context)

export { Context, Provider }
