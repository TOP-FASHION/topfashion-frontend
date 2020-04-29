/**
 * @param {String} url
 * @return {String}
 * */
export default function decode(url: any) {
  return decodeURIComponent(url.replace(/\+/g, ' '));
}
