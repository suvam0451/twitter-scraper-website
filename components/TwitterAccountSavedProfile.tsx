import {
  Avatar,
  Box,
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Progress,
  Text,
} from '@chakra-ui/react'
import {} from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import { useTwitterStateContext } from '../context/twitterProfileReducer'
import {
  ITwitterMediaLinkMeta,
  TWITTER_STORE_ACTION,
} from '../reducers/twitterProfileReducer'
import { fetchPostsForUserId } from '../services/twitter-api.service'
import { faCheckCircle, faCircleMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TwitterAccountSavedProfile = () => {
  const { state, dispatch } = useTwitterStateContext()
  const [Loading, setLoading] = useState(false)

  const itemSelected = async (e: number) => {
    setLoading(true)
    dispatch!({
      type: TWITTER_STORE_ACTION.SELECT_USER,
      payload: {
        id: state?.profileMeta[e].id!,
      },
    })
    const res = await fetchPostsForUserId(state?.profileMeta[e].id!)

    dispatch!({
      type: TWITTER_STORE_ACTION.ADD_IMAGES_TO_GALLERY,
      payload: res.data!,
    })
    setLoading(false)
  }

  return (
    <>
      <Center className={'mb-4'}>
        <Box className="flex flex-row" my={1}>
          {state!.profileMeta.map((ele, i) => (
            <Box
              key={i}
              mx={2}
              onClick={(e) => {
                itemSelected(i)
              }}
              className={'flex flex-col align-middle'}
            >
              <Center>
                <CircularProgress
                  isIndeterminate={Loading && state!.curretUser?.id === ele.id ? true : false}
                  value={100}
                  color="green.400"
                  size={20}
                  thickness={4}
                  trackColor={'gray'}
                >
                  <CircularProgressLabel className="relative" role={"group"} onMouseEnter={() => {

                  }}>
                    <Center>
                      <Avatar
                        size={'lg'}
                        src={
                          'https://avatars.dicebear.com/api/male/username.svg'
                        }
                      />
                    </Center>
                    <FontAwesomeIcon
                      icon={faCircleMinus}
                      className="absolute top-0 right-0"
                      color="red.00"
                      opacity={0.5}
                      size={'5x'}
                    />
                    {state!.curretUser?.id === ele.id ? (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="absolute bottom-0 right-0"
                        size={'5x'}
                      />
                    ) : (
                      <Box className="absolute"></Box>
                    )}
                  </CircularProgressLabel>
                </CircularProgress>
              </Center>
              <Center>
                <Text
                  className="flex-1"
                  fontSize={'sm'}
                  color={'gray.500'}
                >{`@${ele.username}`}</Text>
              </Center>
            </Box>
          ))}
        </Box>
      </Center>
      {Loading ? <Progress size="xs" isIndeterminate /> : <></>}
    </>
  )
}

export default TwitterAccountSavedProfile
