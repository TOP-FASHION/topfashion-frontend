/**
 * @param {String} url
 * @return {String}
 * */
export default function encode (url: any) {
  return encodeURIComponent(url)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22')
}
