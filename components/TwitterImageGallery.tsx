import {
  Box,
  Button,
  Center,
  Image,
  Progress,
  Text,
  Tooltip,
} from '@chakra-ui/react'
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
  faFileDownload,
  faDownload,
  faCloudDownloadAlt,
  faListDots,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons'
import { TWITTER_STORE_ACTION } from '../reducers/twitterProfileReducer'
import { downloadMedia } from '../lib/objectDownload'

const filenameGenerator = {
  photo: /([a-zA-Z0-9]+\.(jpg|png))/,
}

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
  const [DownloadedCurrent, setDownloadedCurrent] = useState(false)

  useEffect(() => {
    window.addEventListener(
      'keydown',
      function (e) {
        if (
          ['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(
            e.code
          ) > -1
        ) {
          e.preventDefault()
        }
      },
      false
    )
  }, [])

  useEffect(() => {
    setTotalLength(state?.nsfwLinks.length || -1)
    if (Counter === -1) {
      setCounter(0)
    }
  }, [state])

  useEffect(() => {
    if (Counter !== -1 && TotalLength > 0) {
      setPercentageProgress((Counter * 100) / TotalLength)
      setDownloadedCurrent(state!.nsfwLinks[Counter].downloaded)
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

  const onPressDownload = (e: any) => {
    if (Counter < 0 || Counter >= TotalLength || !state!.nsfwLinks[Counter].url)
      return

    const { url, type } = state!.nsfwLinks[Counter]
    if (!url) return
    const result = url.match(filenameGenerator.photo)
    if (!result) return
    downloadMedia(url, result[1])
    dispatch({
      type: TWITTER_STORE_ACTION.SET_DOWNLOAD_FLAG_TRUE,
      payload: {
        itemIndex: Counter,
      },
    })
    setDownloadedCurrent(true)
  }

  useKeyPressEvent('ArrowLeft', onPressPrevious)
  useKeyPressEvent('ArrowRight', onPressNext)
  useKeyPressEvent('ArrowUp', onPressLike)
  useKeyPressEvent('ArrowDown', onPressDownload)

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

  const onPressToggleFavourite = (i: number) => {
    if (!LikedCurrent) {
      dispatch!({
        type: TWITTER_STORE_ACTION.LIKE_IMAGE,
        payload: {
          itemIndex: i,
        },
      })
    } else {
      dispatch!({
        type: TWITTER_STORE_ACTION.UNLIKE_IMAGE,
        payload: {
          itemIndex: i,
        },
      })
    }
    setLikedCurrent(!LikedCurrent)
  }

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

      <Center className="flex flex-row h-full" alignContent={'center'}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          size={'3x'}
          onClick={onPressPrevious}
          color={NavigationBounds.leftLocked ? 'gray' : 'white'}
          opacity={NavigationBounds.leftLocked ? 0.1 : 1}
        />

        <Box
          // height={'lg'}
          width={'sm'}
          alignContent={'center'}
          className={'flex flex-row'}
          mx={4}
        >
          <Box verticalAlign={'middle'} margin="auto">
            {Counter === TotalLength ? (
              <DownloadPrompt />
            ) : (
              <Box minHeight={'md'} className={'relative'}>
                <Box className={'my-auto bg-red-400'}>
                  <Image
                    src={state!.nsfwLinks[Counter].url}
                    alt="twitter image"
                    crossOrigin="anonymous"
                    objectFit={'fill'}
                    // marginY={'auto'}
                  />
                </Box>
                <Box className={'absolute right-full bottom-full'}>
                  <Box className={'relative'}>
                    <Box
                      className={
                        'absolute mr-4 mt-1 right-full top-full flex flex-col'
                      }
                    >
                      <Center>
                        <FontAwesomeIcon
                          icon={faHeart}
                          size={'2x'}
                          onClick={() => {
                            onPressToggleFavourite(Counter)
                          }}
                          color={
                            state!.nsfwLinks[Counter].liked || LikedCurrent
                              ? '#ffbfbd'
                              : 'gray'
                          }
                        />
                      </Center>

                      <Center>
                        <Box className={'mt-5'}>
                          <Tooltip
                            label={
                              state?.nsfwLinks[Counter].downloaded
                                ? 'Already downloaded'
                                : 'Press to Download !'
                            }
                            placement={'top'}
                          >
                            <Box>
                              <FontAwesomeIcon
                                icon={faFileDownload}
                                size={'2x'}
                                onClick={() => {
                                  onPressDownload(Counter)
                                }}
                                color={
                                  state?.nsfwLinks[Counter].downloaded ||
                                  DownloadedCurrent
                                    ? 'green'
                                    : 'gray'
                                }
                              />
                            </Box>
                          </Tooltip>
                        </Box>
                      </Center>

                      <Center>
                        <FontAwesomeIcon
                          icon={faEllipsis}
                          size={'2x'}
                          onClick={() => {
                            onPressFavourite(Counter)
                          }}
                          color={'gray'}
                          className={'mt-5'}
                        />
                      </Center>
                    </Box>
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
      <Center className={'mt-2'}>
        <Button onClick={onPressDownload}>Download</Button>
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
          <FontAwesomeIcon icon={faCloudDownload} size={'1x'} />
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
