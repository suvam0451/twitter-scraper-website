import axios from 'axios'
import config from './config.service'

const getClient = () => {
  return axios.create({
    baseURL: config.backend.port === "80" ? `${config.backend.host}`:
    `${config.backend.host}:${config.backend.port}`,
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
