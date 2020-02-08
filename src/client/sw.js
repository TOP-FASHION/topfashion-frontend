/* global self, caches, fetch, location, URL, Request */

// The `serviceWorkerOption` variable is coming from the `serviceworker-webpack-plugin`
// const {assets: BUILD_ASSETS} = serviceWorkerOption

const CACHE_NAME_PREFIX = 'topfashion-'
const CACHE_NAME = `${CACHE_NAME_PREFIX}v1`

const OFFLINE_PAGE = new Request('/', {
  headers: { 'x-offline-mode': 'true' }
})
const OFFLINE_ASSETS = [
  '/assets/img/logos/shop-logo.svg',
  '/favicon-32x32.png',
  '/favicon-16x16.png'
]

// Install
self.addEventListener('install', event => {
  // Pre-cache resources
  event.waitUntil(
    updateOfflineCache()
  )
})

// Activate
self.addEventListener('activate', event => {
  // Delete all other caches with same prefix, leave current CACHE_NAME caches only
  event.waitUntil(
    removeOutdatedCache()
  )
})

// Fetch
self.addEventListener('fetch', event => {
  const request = event.request
  const requestUrl = new URL(request.url)

  // Skip foreign requests
  const isNativeOrigin = requestUrl.origin === location.origin
  if (!isNativeOrigin) {
    return
  }
  // Skip non-GET requests
  const isGetMethod = request.method === 'GET'
  if (!isGetMethod) {
    return
  }
  // Skip non-html requests (basically this will catch the page loading itself) and
  // requests related to non-offline resources
  const headerAccept = request.headers.get('accept')
  const isHtmlPage = !!headerAccept && headerAccept.includes('text/html')
  const isOfflineAsset = OFFLINE_ASSETS.includes(requestUrl.pathname)
  if (!isHtmlPage && !isOfflineAsset) {
    return
  }

  // Define function to get offline cache
  let getOfflineCache
  if (isHtmlPage) {
    getOfflineCache = () => getOfflinePageCache()
  } else if (isOfflineAsset) {
    getOfflineCache = () => getOfflineAssetCache(request)
  } else {
    getOfflineCache = () => Promise.reject(new Error())
  }

  // Return "offline" resources if request is rejected (means "offline" mode)
  event.respondWith(
    fetch(request).catch(
      // Basically fetch() will only reject a promise if the user is offline, or some unlikely networking error occurs,
      // such a DNS lookup failure
      error => {
        return getOfflineCache().then(
          cachedResponse => {
            // Cache exists
            if (typeof cachedResponse !== 'undefined') {
              return cachedResponse
            }
            return Promise.reject(error)
          },
          () => Promise.reject(error)
        )
      }
    )
  )
})

// Message
self.addEventListener('message', event => {
  const { command } = event.data || {}

  switch (command) {
    case 'updateOfflineCache': {
      updateOfflineCache()
      break
    }
  }
})

// FUNCTIONS

function updateOfflineCache () {
  return Promise.all([
    fetchAndPutInCache(OFFLINE_PAGE),
    fetchAndPutInCache(OFFLINE_ASSETS)
  ])
}

function getOfflinePageCache () {
  return getFromCache(OFFLINE_PAGE)
}

function getOfflineAssetCache (offlineAsset) {
  return getFromCache(offlineAsset)
}

function fetchAndPutInCache (request) {
  return caches.open(CACHE_NAME).then(
    cache => Array.isArray(request) ? cache.addAll(request) : cache.add(request)
  )
}

function getFromCache (request) {
  return caches.open(CACHE_NAME).then(
    cache => cache.match(request)
  )
}

function removeOutdatedCache () {
  return caches.keys().then(
    keys => Promise.all(
      keys.map(key => {
        if (key.startsWith(CACHE_NAME_PREFIX) && key !== CACHE_NAME) {
          return caches.delete(key)
        }
      })
    )
  )
}
