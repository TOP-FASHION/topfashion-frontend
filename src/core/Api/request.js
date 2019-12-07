import axios from 'axios'
import isPlainObject from 'lodash/isPlainObject'
import { Base64 } from 'js-base64'

const codeMessage = {
  200: 'ошибка'
}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response.data
  }
  const errortext = codeMessage[response.status] || response.statusText

  const error = new Error(errortext)
  error.name = response.status
  error.message = response
  throw error
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

export default async function request (url, options) {
  try {
    const defaultOptions = {
      credentials: 'include'
    }
    const newOptions = { ...defaultOptions, ...options }

    newOptions.headers = {
      Authorization: `Basic ${Base64.encode(`ck_83f4bd53fb1c969a67523637f6e13a9e607fc925:cs_c0a3dcc4a48b4ae106f7a81e9cf2a69ce3b8f67f`)}`
    }
    if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
      if (typeof window !== 'undefined' && !(newOptions.data instanceof window.FormData)) {
        newOptions.headers = {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          ...newOptions.headers
        }
        const formData = new window.FormData()

        for (const name in newOptions.data) {
          formData.set(name, newOptions.data[name])
        }

        newOptions.data = formData
      } else {
        // newOptions.body is FormData
        newOptions.headers = {
          Accept: 'application/json',
          ...newOptions.headers
        }
      }
    } else {
      url = url + (newOptions.data && Object.keys(newOptions.data).length ? '?' + convertArguments(newOptions.data) : '')
    }

    const response = await axios(`https://localhost:8443${url}`, newOptions)
    if (response.status === 401) {
      return
    }

    return response
  } catch (err) {
    return console.log('Error===', err)
  }
}

function convertArguments (args) {
  if (isPlainObject(args)) {
    return Object.keys(args).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(`${args[key]}`)}`).join('&')
  }
  return args
}
