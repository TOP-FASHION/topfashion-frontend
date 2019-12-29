import axios from 'axios'
import isPlainObject from 'lodash/isPlainObject'
import { Base64 } from 'js-base64'

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
      Authorization: `Basic ${Base64.encode(`${process.env.API_KEY}:${process.env.API_SECRET}`)}`
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
    return null
  }
}

function convertArguments (args) {
  if (isPlainObject(args)) {
    return Object.keys(args).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(`${args[key]}`)}`).join('&')
  }
  return args
}
