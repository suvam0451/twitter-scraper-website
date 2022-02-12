import axios from 'axios'
import config from './config.service'

const getClient = () => {
  console.log(`${config.backend.host}:${config.backend.port}`)

  return axios.create({
    baseURL: `http://${config.backend.host}:${config.backend.port}`,
  })
}

export const getRequest = async <T>(path: string) => {
    return await getClient().get<T>(path).then((res) => {
        console.log("get request response", res.data);
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
