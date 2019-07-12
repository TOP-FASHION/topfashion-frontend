export default {
  set (key, value) {
    if (typeof window !== 'undefined') {
      if (!window.name) {
        window.name = `${Date.now()}${Math.random()}`
      }
      return window.sessionStorage.setItem(`tabId(${window.name})[${key}]`, value)
    }
  },
  get (key) {
    if (typeof window !== 'undefined') {
      if (!window.name) return undefined
      return window.sessionStorage.getItem(`tabId(${window.name})[${key}]`)
    }
  },
  remove (key) {
    if (typeof window !== 'undefined') {
      return window.sessionStorage.removeItem(`tabId(${window.name})[${key}]`)
    }
  }
}
