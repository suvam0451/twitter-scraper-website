import axios from 'axios'
import config from './config.service'

export const getClient = () => {
    console.log("backend config block", config)
  return axios.create({
    baseURL: `${config.backend.host}`,
  })
}

export const getRequest = async <T>(path: string) => {
    return await getClient().get<T>(path).then((res) => {
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
