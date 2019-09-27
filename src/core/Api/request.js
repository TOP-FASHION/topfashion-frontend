import axios from 'axios'

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
      Authorization: `Basic ${btoa(
        `${process.env.API_KEY}:${process.env.API_SECRET}`
      )}`
    }
    if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
      if (!(newOptions.data instanceof FormData)) {
        newOptions.headers = {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          ...newOptions.headers
        }
        let formData  = new FormData();

        for(let name in newOptions.data) {
          formData.set(name, newOptions.data[name]);
        }

        newOptions.data = formData
      } else {
        // newOptions.body is FormData
        newOptions.headers = {
          Accept: 'application/json',
          ...newOptions.headers
        }
      }
    }

    const response = await axios(`${url}`, newOptions)
    if (response.status === 401) {
      return
    }

    return response.data
  } catch (err) {
    return console.log('Error===', err)
  }
}
