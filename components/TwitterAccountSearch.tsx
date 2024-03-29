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
import { faQuestionCircle, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import {
  DragHandleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  HamburgerIcon,
} from '@chakra-ui/icons'
const AUTOCOMPLETION_KEY = 'twitter_account_search_history'

const TwitterAccountSearch = () => {
  const [Loading, setLoading] = useState(false)
  const [AutoCompletion, setAutoCompletion] = useState<string[]>([])

  const { state, dispatch } = useTwitterStateContext()

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
    setAutoCompletion(getSearchHistory(AUTOCOMPLETION_KEY, q))
  }

  return (
    <Box className={'relative flex flex-row'}>
      <Box
        px={8}
        py={8}
        minWidth="md"
        maxWidth="md"
        margin="auto"
        mt={'16'}
        mb={4}
      >
        <Box className={'relative'}>
          <SearchBar
            searchCallback={onSearch}
            loading={Loading}
            autoCompletionList={AutoCompletion}
            recommendationsLimit={5}
            handleSearchTextChange={onSearchTextChanged}
            placeholder={"Search for twitter handle..."}
          />
          <Box className={'absolute right-0 top-1/2'}>
            <Box className={'relative'}>
              <Box className={'pl-3 absolute -translate-y-1/2'}>
                <Box>
                  <Menu size={'small'}>
                    <MenuButton as={HamburgerIcon} />
                    <MenuList>
                      <MenuItem
                        icon={<ChevronLeftIcon fontSize={36} />}
                        height={8}
                        command={'←'}
                      >
                        Previous
                      </MenuItem>
                      <MenuItem
                        icon={<ChevronRightIcon fontSize={36} />}
                        height={8}
                        command={'→'}
                      >
                        Next
                      </MenuItem>
                      <MenuItem
                        icon={<ChevronUpIcon fontSize={36} />}
                        height={8}
                        command={'↑'}
                      >
                        Like
                      </MenuItem>
                      <MenuItem
                        icon={<ChevronDownIcon fontSize={36} />}
                        height={8}
                        command={'↓'}
                      >
                        Download
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

{
  /* <FontAwesomeIcon
icon={faQuestionCircle}
size={'2x'}
opacity={0.25}
/> */
}
export default TwitterAccountSearch
