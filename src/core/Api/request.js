import * as history from 'history'

const myHistory = history.createHashHistory()

const codeMessage = {
  200: 'ошибка'
}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
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

export default function request (url, options) {
  console.log('url', url)
  console.log('options', options)
  const defaultOptions = {
    credentials: 'include'
  }
  const newOptions = { ...defaultOptions, ...options }
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers
      }
      newOptions.body = JSON.stringify(newOptions.body)
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers
      }
    }
  }

  return fetch (url + `&output_format=JSON&ws_key=${process.env.PRESTASHOP_KEY}`, newOptions)
    .then(checkStatus)
    .then(response => {
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return Promise.resolve(response.text())
      }
      return Promise.resolve(response.json())
    })
    .catch(err => {
      const status = err.name
      if (status === 401) {
        myHistory.push('/user/login')
        return
      }
      if (status === 403) {
        myHistory.push('/exception/403')
        return
      }
      if (status <= 504 && status >= 500) {
        myHistory.push('/exception/500')
        return
      }
      if (status >= 404 && status < 422) {
        myHistory.push('/exception/404')
      }
    })
}