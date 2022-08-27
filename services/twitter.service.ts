import { getClient } from './backend.service'

export const getMetaFromUsername = async (username: string) => {
    
}

export type UsernameListResponse = {
  data: {
    data: [
      {
        id: number,
        name: string,
        username: string
      }
    ],
    count: number
  }
}
export const searchUsernames = async (q: string) => {
  return await getClient().get<UsernameListResponse>(`twitter/users?q=${q}`)
    .then((res) => {
      console.log(res)
    return {
      code: res.status,
      statusText: res.statusText,
      data: res.data
    }
  }).catch((e) => {
    return {
      code: 404,
      statusText: "not found",
      data: undefined
    }
  })
}