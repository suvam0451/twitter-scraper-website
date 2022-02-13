import { useEffect, useState } from 'react'
import { getRequest } from '../services/backend.service'
import {
  getSearchHistory,
  setSearchHistory,
} from '../services/local-search-history.service'
import SearchBar from './elements/searchBar'
import { useTwitterStateContext } from '../context/twitterProfileReducer'
import { TWITTER_STORE_ACTION } from '../reducers/twitterProfileReducer'
import { UserMetaData } from '../types/twitter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCoffee,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { Button } from '@chakra-ui/react'
import { downloadMedia } from '../lib/objectDownload'

const AUTOCOMPLETION_KEY = 'twitter_account_search_history'

const TwitterAccountSearch = () => {
  const [Loading, setLoading] = useState(false)
  const [AutoCompletion, setAutoCompletion] = useState<string[]>([])

  const { state, dispatch } = useTwitterStateContext()

  useEffect(() => {
    console.log('account search component', state)
  }, [state])

  const onSearch = async (q: string) => {
    setLoading(true)
    setSearchHistory(AUTOCOMPLETION_KEY, q)
    const res = await getRequest<UserMetaData>(`/twitter/users?q=${q}`)

    if (res.code !== 200) {
      setLoading(false)
      return
    }
    dispatch!({
      type: TWITTER_STORE_ACTION.ADD_USER_TO_FAVOURITES,
      payload: {
        id: res.data?.data?.id! as unknown as number,
        username: res.data?.data?.username!,
        name: res.data?.data?.name!,
      },
    })
    setLoading(false)
  }

  const onSearchTextChanged = (q: string) => {
    console.log('debounced', q)
    setAutoCompletion(getSearchHistory(AUTOCOMPLETION_KEY, q))
  }

  useEffect(() => {
    console.log(AutoCompletion)
  }, [AutoCompletion])
  return (
    <SearchBar
      searchCallback={onSearch}
      loading={Loading}
      autoCompletionList={AutoCompletion}
      recommendationsLimit={5}
      handleSearchTextChange={onSearchTextChanged}
    />
  )
}

export default TwitterAccountSearch
