import cleanObject from './cleanObject'

/**
 * Copies all properties from one object to another. (light version)
 * @param {object} src - object-donor
 * @param {object} dest - object-acceptor (own properties will be removed before copying)
 * @returns {object} dest
 */
export default (dest = {}, src = {}) => {
  if (src !== dest) {
    cleanObject(dest)
    for (const prop in src) {
      if (src.hasOwnProperty(prop)) {
        dest[prop] = src[prop]
      }
    }
  }
  return dest
}
