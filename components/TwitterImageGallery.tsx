import { Box, Button, Center, Image, Progress, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useKeyPressEvent } from 'react-use'
import { useTwitterStateContext } from '../context/twitterProfileReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCoffee,
  faChevronLeft,
  faChevronRight,
  faHeart,
  faCloudDownload,
} from '@fortawesome/free-solid-svg-icons'
import { TWITTER_STORE_ACTION } from '../reducers/twitterProfileReducer'

const TwitterImageGallery = () => {
  const { state, dispatch } = useTwitterStateContext()
  const [Counter, setCounter] = useState(-1)
  const [TotalLength, setTotalLength] = useState(-1)
  const [PercentageProgress, setPercentageProgress] = useState(0)
  const [NavigationBounds, setNavigationBounds] = useState({
    leftLocked: true,
    rightLocked: true,
  })
  const [LikedCurrent, setLikedCurrent] = useState(false)

  useEffect(() => {
    setTotalLength(state?.nsfwLinks.length || -1)
    if (Counter === -1) {
      setCounter(0)
    }
  }, [state])

  useEffect(() => {
    if (Counter !== -1 && TotalLength > 0) {
      setPercentageProgress((Counter * 100) / TotalLength)
    }
  }, [Counter])

  const onPressPrevious = (e: any) => {
    if (Counter == 0) return
    setCounter(Counter - 1)
  }

  const onPressNext = (e: any) => {
    if (Counter >= TotalLength) return
    setCounter(Counter + 1)
  }

  const onPressLike = (e: any) => {
    setLikedCurrent(true)
    dispatch!({
      type: TWITTER_STORE_ACTION.LIKE_IMAGE,
      payload: {
        itemIndex: Counter,
      },
    })
  }

  const onPressDislike = (e: any) => {
    setLikedCurrent(false)
    dispatch!({
      type: TWITTER_STORE_ACTION.LIKE_IMAGE,
      payload: {
        itemIndex: Counter,
      },
    })
  }

  useKeyPressEvent('ArrowLeft', onPressPrevious)
  useKeyPressEvent('ArrowRight', onPressNext)
  useKeyPressEvent('ArrowUp', onPressLike)
  useKeyPressEvent('ArrowDown', onPressDislike)

  useEffect(() => {
    setNavigationBounds({
      ...NavigationBounds,
      leftLocked: Counter == 0 ? true : false,
      rightLocked: Counter === TotalLength ? true : false,
    })
    if (Counter === TotalLength || state!.nsfwLinks.length == 0) return
    setLikedCurrent(state!.nsfwLinks[Counter].liked)
  }, [Counter])

  const onPressFavourite = (i: number) => {
    setLikedCurrent(!LikedCurrent)
    dispatch!({
      type: TWITTER_STORE_ACTION.LIKE_IMAGE,
      payload: {
        itemIndex: i,
      },
    })
  }

  useEffect(() => {
    console.log(LikedCurrent)
    console.log('state updated', state)
  }, [state, LikedCurrent])

  return state!.nsfwLinks.length > 0 && Counter !== -1 ? (
    <>
      <Center className="flex flex-row mb-4">
        <Text
          className={'mr-4'}
        >{`Viewed ${Counter} out of ${TotalLength} images`}</Text>
        <Progress
          value={PercentageProgress}
          size="xs"
          colorScheme={Counter === TotalLength ? 'green' : 'pink'}
          minWidth={128}
        />
      </Center>

      <Center className="flex flex-row" alignContent={'center'}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          size={'3x'}
          onClick={onPressPrevious}
          color={NavigationBounds.leftLocked ? 'gray' : 'white'}
          opacity={NavigationBounds.leftLocked ? 0.1 : 1}
        />

        <Box
          boxSize={'sm'}
          alignContent={'center'}
          className={'flex flex-row'}
          mx={4}
        >
          <Box verticalAlign={'middle'} margin="auto" className="relative">
            {Counter === TotalLength ? (
              <DownloadPrompt />
            ) : (
              <Box>
                <Image
                  src={state!.nsfwLinks[Counter].url}
                  alt="twitter image"
                  crossOrigin="anonymous"
                  objectFit={'contain'}
                  marginY={'auto'}
                />
                <Box className={'absolute right-full bottom-full'}>
                  <Box className={'relative'}>
                    <FontAwesomeIcon
                      icon={faHeart}
                      size={'2x'}
                      onClick={() => {
                        onPressFavourite(Counter)
                      }}
                      color={
                        state!.nsfwLinks[Counter].liked || LikedCurrent
                          ? '#ffbfbd'
                          : 'gray'
                      }
                      className={'absolute mr-1 mt-1 right-full top-full'}
                    />
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        <FontAwesomeIcon
          icon={faChevronRight}
          size={'3x'}
          onClick={onPressNext}
          color={NavigationBounds.rightLocked ? 'gray' : 'white'}
          opacity={NavigationBounds.rightLocked ? 0.1 : 1}
        />
      </Center>
    </>
  ) : (
    <></>
  )
}

const DownloadPrompt = () => {
  const { state, dispatch } = useTwitterStateContext()
  const [Liked, setLiked] = useState(0)

  useEffect(() => {
    let count = 0
    state?.nsfwLinks.forEach((ele) => {
      if (ele.liked) count++
    })
    setLiked(count)
  }, [state])
  return (
    <>
      <Center className='"flex flex-col'>
        <Box>
          <Text fontSize={'3xl'}>Done !!!</Text>
        </Box>

        <Box>
          <Text>{`You liked ${Liked}/${state?.nsfwLinks.length} picture`}</Text>
        </Box>
        <Button mt={8}>
          {' '}
          <FontAwesomeIcon icon={faCloudDownload} size={"1x"} />
          <Text ml={2}>Download Now</Text>
        </Button>
      </Center>
    </>
  )
}
export default TwitterImageGallery
/**
 * UpskirtRin
 * LittleSexyOni_
 * GenshinLewdss
 * Tifasexy1
 */