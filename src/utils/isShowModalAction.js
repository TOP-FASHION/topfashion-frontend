/**
 * Helper for shouldComponentUpdate
 * @param nextProps
 * @param nextState
 * @returns {boolean}
 */
export default function isShowModalAction (nextProps, nextState) {
  if (nextProps && nextProps.history && nextProps.history.location) {
    return (
      nextProps.history.action === 'PUSH' &&
      nextProps.history.location.search.indexOf('modal') !== -1
    )
  }
  return true
}
