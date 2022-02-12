import { Box, Button, Center, Image, Progress } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTwitterStateContext } from '../context/twitterProfileReducer'

const TwitterImageGallery = () => {
  const { state, dispatch } = useTwitterStateContext()
  const [Counter, setCounter] = useState(-1)
  const [TotalLength, setTotalLength] = useState(-1)

  useEffect(() => {
    setTotalLength(state?.nsfwLinks.length || -1)
    if (Counter === -1) {
      setCounter(0)
    }
  }, [state])

  const onPressPrevious = (e: any) => {
    if (Counter == 0) {
      setCounter(TotalLength - 1)
    }
    setCounter(Counter - 1)
  }

  const onPressNext = (e: any) => {
    if (Counter >= TotalLength - 1) {
      setCounter(0)
    }
    setCounter(Counter + 1)
  }

  return state!.nsfwLinks.length > 0 && Counter !== -1 ? (
    <>
      <Center className="flex flex-row">
        <Button size={'sm'} onClick={onPressPrevious}>
          Previous
        </Button>

        <Box boxSize={'sm'}>
          <Image
            src={state!.nsfwLinks[Counter].url}
            alt="twitter image"
            crossOrigin="anonymous"
            objectFit={'contain'}
          />
        </Box>
        <Button size={'sm'} onClick={onPressNext}>
          Next
        </Button>
      </Center>
    </>
  ) : (
    <></>
  )
}

export default TwitterImageGallery
