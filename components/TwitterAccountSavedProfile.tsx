import { Box, Button } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useTwitterStateContext } from '../context/twitterProfileReducer'

const TwitterAccountSavedProfile = () => {
  const { state, dispatch } = useTwitterStateContext()

  useEffect(() => {
    console.log('accounts state', state)
  }, [state])
  return (
    <>
      <Box>sex</Box>
      <Button
            onClick={() => {
              console.log(state)
            }}
          >Bitch</Button>
      {state!.profileMeta.map((ele) => (
        <Box>
          <Box>{ele.id}</Box>

        </Box>
      ))}
    </>
  )
}

export default TwitterAccountSavedProfile
