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
} from '@chakra-ui/react'
import { useDebouncedCallback } from 'use-debounce'
import useOutsideClickDetector from '../../hooks/useClickedOutsideElement'

type SearchBarProps = {
  searchCallback: (str: string) => void
  handleSearchTextChange: (str: string) => void
  loading: boolean
  autoCompletionList: string[]
  recommendationsLimit: number
}

const SearchBar = (props: SearchBarProps) => {
  const {
    searchCallback,
    loading,
    autoCompletionList,
    recommendationsLimit,
    handleSearchTextChange,
  } = props
  const SearchRef = useRef<HTMLInputElement>(null)

  const debounced = useDebouncedCallback((e) => {
      if(SearchRef.current!.value.length > 2) {
    handleSearchTextChange(SearchRef.current!.value)
}
  }, 200)

  const handleSearch = (e: any) => {
    searchCallback(SearchRef.current!.value)
  }

  return (
    <Box px={8} py={8} minWidth="md" maxWidth="md" margin="auto" mt={'16'} mb={8}>
      <InputGroup>
        <InputLeftElement>
          <SettingsIcon color="green.500" />
        </InputLeftElement>
        <Input
          placeholder={'Enter your search query here...'}
          onChange={debounced}
          ref={SearchRef}
        />
        <InputRightElement onClick={handleSearch}>
          {loading ? <Spinner /> : <SearchIcon color="green.500" />}
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
