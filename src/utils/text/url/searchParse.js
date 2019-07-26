import decode from './decode'

const SEARCH = /([^&=]+)=?([^&]*)/g

/**
 * @param {String} search
 * @param {String} prefix
 * @return {Object}
 * */
export default function searchParse(search, prefix = '?') {
  if (search.startsWith(prefix)) {
    search = search.slice(prefix.length)
  }
  const result = {}
  let match
  while ((match = SEARCH.exec(search))) {
    result[decode(match[1])] = decode(match[2])
  }
  return result
}
