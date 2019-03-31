export default {
  set (key, value) {
    if (!window.name) {
      window.name = `${Date.now()}${Math.random()}`
    }
    return window.sessionStorage.setItem(`tabId(${window.name})[${key}]`, value)
  },
  get (key) {
    if (!window.name) return undefined
    return window.sessionStorage.getItem(`tabId(${window.name})[${key}]`)
  },
  remove (key) {
    return window.sessionStorage.removeItem(`tabId(${window.name})[${key}]`)
  }
}
