const UNDEFINED = {}
export default (Component, field, descriptor) => {
  const { get } = descriptor
  if (!get) {
    console.error('you may use cache only on getters')
    return descriptor
  }
  let cache = UNDEFINED
  function clear () {
    cache = UNDEFINED
  }
  descriptor.get = function () {
    if (cache !== UNDEFINED) return cache
    setTimeout(clear)
    return (cache = get.call(this))
  }
  return descriptor
}
