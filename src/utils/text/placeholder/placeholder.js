/**
 * @param {String} text
 * @param {Object} [data]
 * @return {String}
 * */
export default function(text = '', data = {}) {
  return text.replace(
    /{([a-zA-Z0-9]+)}/g,
    (placeholder, placeholderId) => data[placeholderId] || placeholder
  )
}
