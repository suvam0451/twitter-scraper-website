import { Avatar, Box, Button, Center, Progress } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTwitterStateContext } from '../context/twitterProfileReducer'
import {
  ITwitterMediaLinkMeta,
  TWITTER_STORE_ACTION,
} from '../reducers/twitterProfileReducer'
import { fetchPostsForUserId } from '../services/twitter-api.service'

const TwitterAccountSavedProfile = () => {
  const { state, dispatch } = useTwitterStateContext()
  const [Loading, setLoading] = useState(false)

  const itemSelected = async (e: number) => {
    const res = await fetchPostsForUserId(state?.profileMeta[e].id!)
    console.log("res", res);
    console.log("data", res.data);
    dispatch!({
      type: TWITTER_STORE_ACTION.ADD_IMAGES_TO_GALLERY,
      payload: res.data!,
    })
    setLoading(false)
  }

  return (
    <>
      {Loading ? <Progress size="xs" isIndeterminate /> : <></>}
      <Center>
        <Box className="flex flex-row" my={1}>
          {state!.profileMeta.map((ele, i) => (
            <Box
              key={i}
              mx={2}
              onClick={(e) => {
                itemSelected(i)
              }}
            >
              <Avatar
                size={'lg'}
                src={'https://avatars.dicebear.com/api/male/username.svg'}
              />
            </Box>
          ))}
        </Box>
      </Center>
    </>
  )
}

export default TwitterAccountSavedProfile
