/**
 * @param {String} url
 * @return {String}
 * */
export default function decode(url) {
  return decodeURIComponent(url.replace(/\+/g, ' '))
}
