import decapitalize from './decapitalize'

/**
 * This can be used to log issues in development environments in critical paths. Removing the logging code for
 * production environments will keep the same logic and follow the same code paths.
 * @param {string} [message] - Message to display in the warning.
 * @return {undefined}
 */
export default process.env.NODE_ENV === 'production'
  ? () => {}
  : message => {
    message = message
      ? `Warning: ${decapitalize(unindent(message).trim())}`
      : `Warning`

    if (typeof console !== 'undefined') {
      console.error(message)
    }

    // This error was thrown as a convenience so that you can use this stack to find the callsite that caused this
    // warning to fire.
    try {
      throw new Error(message)
    } catch (x) {
      console.error(x)
    }
  }

//
// UTILS
//

function unindent (string) {
  const match = string.match(/^[^\S\n]*(?=\S)/gm)
  const indent = match ? Math.min(...match.map(space => space.length)) : 0
  return indent
    ? string.replace(new RegExp(`^[^\\S\\n]{${indent}}`, 'gm'), '')
    : string
}
