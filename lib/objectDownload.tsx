import axios, { AxiosRequestConfig } from 'axios'
import { METHODS } from 'http'

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = filename || 'file'

  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url)
      a.removeEventListener('click', clickHandler)
    }, 150)
  }

  a.addEventListener('click', clickHandler, false)
  a.click()
  return a
}

export const downloadMedia = async (url, filename) => {
  const config: AxiosRequestConfig = {
    url: url,
    method: 'GET',
    responseType: 'blob',
  }
  const response = await axios.request(config)
  await downloadBlob(response.data, filename)
  return 0
}
