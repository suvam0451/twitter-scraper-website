import React, { useEffect, useRef, useState } from 'react'
import {
  SearchIcon,
  CopyIcon,
  SettingsIcon,
  RepeatClockIcon,
  ArrowLeftIcon,
  ArrowForwardIcon,
} from '@chakra-ui/icons'
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListIcon,
  ListItem,
  Spinner,
  Grid,
  GridItem,
  Flex,
  Image,
  Badge,
  InputLeftElement,
  Text,
  Center,
} from '@chakra-ui/react'
import { useDebouncedCallback } from 'use-debounce'
import useOutsideClickDetector from '../../hooks/useClickedOutsideElement'
import { useKeyPressEvent } from 'react-use'

type SearchBarProps = {
  searchCallback: (str: string) => void
  handleSearchTextChange: (str: string) => void
  loading: boolean
  autoCompletionList: string[]
  recommendationsLimit: number
  placeholder?: string
}

const SearchBar = (props: SearchBarProps) => {
  const {
    searchCallback,
    loading,
    autoCompletionList,
    recommendationsLimit,
    handleSearchTextChange,
    placeholder
  } = props
  const SearchRef = useRef<HTMLInputElement>(null)
  const [CanPressEnter, setCanPressEnter] = useState(false)

  const debounced = useDebouncedCallback((e) => {
    if (SearchRef.current!.value.length > 2) {
      setCanPressEnter(true)
      handleSearchTextChange(SearchRef.current!.value)
    } else {
      setCanPressEnter(false)
    }
  }, 200)

  const handleSearch = (e: any) => {
    searchCallback(SearchRef.current!.value)
  }


  useKeyPressEvent('Enter', handleSearch)

  return (
    <Box>
      <InputGroup>
        <InputLeftElement>
          <SettingsIcon color="green.500" />
        </InputLeftElement>
        <Input
          placeholder={placeholder || 'Enter your search query here...'}
          onChange={debounced}
          ref={SearchRef}
        />

        <InputRightElement onClick={handleSearch} className={'relative'}>
          {loading ? (
            <Spinner />
          ) : (
            <Box className={'flex flex-row'}>
              <SearchIcon color="green.500" />
              {CanPressEnter ? (
                <Box className={'absolute top-1/2'}>
                  <Box className={'relative'}>
                    <Box
                      className={
                        'absolute top-0 right-0 pr-6 translate-x-1/2 -translate-y-1/2'
                      }
                    >
                      <Text
                        color={'gray'}
                        borderWidth={1}
                        borderColor={'gray'}
                        borderRadius={'sm'}
                        paddingX={1}
                        opacity={0.5}
                        fontSize={14}
                        marginRight={4}
                      >
                        ⏎
                      </Text>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <></>
              )}
            </Box>
          )}
        </InputRightElement>
      </InputGroup>
      <AutoCompletionPopup
        loading={loading}
        onSelect={handleSearch}
        autoCompletionList={autoCompletionList}
        recommendationsLimit={recommendationsLimit}
        show={true}
      />
    </Box>
  )
}

type AutoCompletionProps = {
  loading: boolean
  show: boolean
  onSelect: (e: string) => void
  autoCompletionList: string[]
  recommendationsLimit: number
}

const AutoCompletionPopup = (props: AutoCompletionProps) => {
  const { loading, show, onSelect, autoCompletionList, recommendationsLimit } =
    props
  const [Show, setShow] = useState(show)
  const [ShouldCheck, setShouldCheck] = useState(false)

  const ref = useRef(null)
  const ClickDetectedOutside = useOutsideClickDetector({
    ref,
    ifShouldCheck: ShouldCheck,
  })

  useEffect(() => {
    setShow(false)
  }, [ClickDetectedOutside])

  const onRecommendationAccept = (o: string) => {
    setShow(false)
    onSelect(o)
  }

  if (!Show) return <></>
  if (loading) return <Spinner />
  return (
    <>
      <Box border="1px" borderColor="black" ref={ref}>
        <List spacing={0}>
          {autoCompletionList
            .map((o, i) => (
              <ListItem
                key={i}
                onClick={(e) => {
                  onRecommendationAccept(o)
                }}
                _hover={{ background: 'gray.200' }}
                verticalAlign="middle"
                paddingLeft="2"
              >
                <ListIcon color="green.500" />
                {o}
                {/* {createFragment(o.item_name, current)} */}
              </ListItem>
            ))
            .slice(0, 5)}
        </List>
      </Box>
    </>
  )
}

export default SearchBar
