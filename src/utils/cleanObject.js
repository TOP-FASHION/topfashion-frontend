/**
 * Removes all own properties from object.
 * @param obj - object to cleaning
 * @returns {object} obj
 */
export default (obj = {}) => {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      delete obj[prop]
    }
  }
  return obj
}
