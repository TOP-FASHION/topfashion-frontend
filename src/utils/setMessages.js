/* import ApiError from './Api/ApiError' */

const GLOBAL_VARIABLES_SEARCH_PATTERN = /%[A-Z0-9_]+?%/g

export default function setMessages (component, messages, prefix = '') {
  if (!component.props.intl) {
    throw Error(
      `${component.constructor.name} is not connected to react intl, use injectIntl for that`
    )
  }

  // TODO: Think about caching (the function is executed too many times)
  const getMessage = (key, props) => {
    if (!key) return ''
    if (props === '') return ''
    let postfix = ''
    const typeOfProps = typeof props
    if (typeOfProps === 'string' || typeOfProps === 'number') {
      postfix = props
      props = undefined
    }
    const options =
      typeof key === 'object' && !(key instanceof Array) ? key : { key }
    key = options.key
    if (key instanceof Array) {
      const keys = []
      for (const value of key) {
        const tempKey = prefix + value + postfix
        if (messages[tempKey]) {
          return component.props.intl.formatMessage(messages[tempKey], props)
        }
        keys.push(tempKey)
      }
      return 'default' in options ? options.default : keys.join(' | ')
    }
    key = prefix + key + postfix
    /*    if (props instanceof ApiError) {
      const errorKey = key + props.error
      if (!messages[errorKey]) {
        const codeKey = key + props.errorCode
        if (!messages[codeKey]) {
          return 'default' in options ? options.default : errorKey + ' | ' + codeKey
        }
        key = codeKey
      } else {
        key = errorKey
      }
      props = props.errorDetails
    } */
    if (!messages[key]) return 'default' in options ? options.default : key
    return component.props.intl.formatMessage(messages[key], props)
  }

  return (...args) =>
    replaceGlobalVariables(
      getMessage.apply(null, args),
      component.props.intl.messages
    )
}

function replaceGlobalVariables (translation = '', messages = {}) {
  return `${translation}`.replace(
    GLOBAL_VARIABLES_SEARCH_PATTERN,
    globalVariableRaw => {
      const globalVariable = globalVariableRaw.slice(1, -1)
      const globalVariableValue = messages[`$${globalVariable}`]
      return typeof globalVariableValue === 'string'
        ? globalVariableValue
        : globalVariableRaw
    }
  )
}
