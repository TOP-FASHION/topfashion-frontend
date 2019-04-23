import encode from './encode'

/**
 * @param {Object} obj
 * @param {String} prefix
 * @return {String}
 * */
export default function searchStringify (obj = {}, prefix = '?') {
  let result = ''
  for (const key in obj) {
    result += encode(key) + '=' + encode(obj[key]) + '&'
  }
  result = result.slice(0, -1)
  return result && prefix ? prefix + result : result
}
