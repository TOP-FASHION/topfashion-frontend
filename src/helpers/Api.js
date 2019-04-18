/* global fetch */

function parseJSON (response) {
  return response.json()
}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

export function request (url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
}

export function apiFetch (path, options = {}) {
  const host = `${process.env.APP_HOST}:${process.env.APP_PORT}`
  const contextHost = (process.env.SERVER && host) || ''
  const apiUrl = `${contextHost}/billfold-api${path}`

  options.credentials = 'include'

  return fetch(apiUrl, options)
    .then(checkStatus)
    .then(parseJSON)
}

export function apiPost (path, data) {
  let str = []
  if (data) {
    for (let key in data) {
      str.push(`${key}=${data[key]}`)
    }
  }

  const options = {
    method: 'POST',
    body: str.join('&'),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }
  return apiFetch(path, options)
}
