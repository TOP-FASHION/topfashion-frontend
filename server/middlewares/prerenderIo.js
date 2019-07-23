const fs = require('fs')
const {promisify} = require('util')
const {default: refreshableData} = require('../../utils/refreshableData')
const normalizeServerRequestUrl = require('../../utils/normalizeServerRequestUrl')

const readFileAsync = promisify(fs.readFile)

const SITEMAP_TTL_DEFAULT_SEC = 8 * 60 * 60 // 8 hours
const SITEMAP_RETRYING_ON_ERROR_SEC = 5 * 60 // 5 minutes

/**
 * Middleware to work with Prerender.io service
 * @param {String} [token='']
 * @param {Object} [options={}]
 * @param {String} [options.protocol]
 * @param {String} [options.bots]
 * @param {String} [options.sitemapPath]
 * @param {Number} [options.sitemapTtl]
 * @param {String} [options.allowedDomains]
 * @param {Boolean} [options.debugMode]
 * @return {Function}
 */
module.exports = (token = '', options = {}) => {
  const prerenderIoToken = '' + (token || '')

  // Skip this middleware if Prerender.io token is not presented
  if (!prerenderIoToken) {
    return (req, res, next) => {
      next()
    }
  }

  const prerenderIoMiddleware = require('prerender-node')

  const prerenderIoProtocol = '' + (options.protocol || 'https')
  const prerenderIoBots = ('' + (options.bots || '')).trim().split(/\s*,\s*/).filter(i => i)
  const sitemapPath = '' + (options.sitemapPath || '')
  const allowedDomains = ('' + (options.allowedDomains || '')).trim().split(/\s*,\s*/).filter(i => i)
  const debugMode = !!options.debugMode
  const shouldShowPrerenderedPageCheckerOriginal = prerenderIoMiddleware.shouldShowPrerenderedPage.bind(prerenderIoMiddleware)
  const shouldShowPrerenderedPageCheckers = [shouldShowPrerenderedPageCheckerOriginal]
  const initiallyAwaitingPromises = []

  prerenderIoMiddleware.set('prerenderToken', prerenderIoToken)
  prerenderIoMiddleware.set('protocol', prerenderIoProtocol)
  prerenderIoMiddleware.set('crawlerUserAgents', prerenderIoBots.length ? prerenderIoBots : prerenderIoMiddleware.crawlerUserAgents)
  prerenderIoMiddleware.set('shouldShowPrerenderedPage', req => shouldShowPrerenderedPageCheckers.every(checker => checker(req)))

  // Return non-prerendered page if domain name of the request is not in the list
  if (allowedDomains.length) {
    shouldShowPrerenderedPageCheckers.push(req => allowedDomains.includes(req.hostname))
  }

  // Reduce number of cached pages (cause Prerender.io cost is depending on that) by generating whitelist using the
  // sitemap.xml
  if (sitemapPath) {
    const sitemapTtlOptionParsed = parseFloat(options.sitemapTtl)
    const sitemapTtl = !isNaN(sitemapTtlOptionParsed) ? sitemapTtlOptionParsed : SITEMAP_TTL_DEFAULT_SEC

    const getWhitelistedUrlsSet = refreshableData(whitelistedUrlsFetcher, {
      ttlSec: sitemapTtl,
      initialData: new Set(),
      initiallyOutdated: true,
      autoRefresh: true,
      retryingDelaySec: SITEMAP_RETRYING_ON_ERROR_SEC,
      debugMode: debugMode
    })

    shouldShowPrerenderedPageCheckers.push(req => {
      const whitelistedUrlsSet = getWhitelistedUrlsSet()
      const urlNormalized = normalizeServerRequestUrl(req.url)
      return whitelistedUrlsSet.has(urlNormalized)
    })

    initiallyAwaitingPromises.push(getWhitelistedUrlsSet.ongoingFetch)
  }

  // eslint-disable-next-line no-console
  console.log(`Middleware "Prerender.io" is enabled.`)

  return async (req, res, next) => {
    try {
      await Promise.all(initiallyAwaitingPromises)
      return prerenderIoMiddleware(req, res, next)
    } catch (error) {
      next(error)
    }
  }

  // FUNCTIONS

  function whitelistedUrlsFetcher () {
    return readFileAsync(sitemapPath, 'utf8').then(data => {
      const urlsRaw = ('' + (data || '')).match(/<loc>[\s\S]*?<\/loc>/gi) || []
      const hostnameRegex = /^.*?\/\/[^/]+/
      const urls = urlsRaw.map(urlRaw => normalizeServerRequestUrl((urlRaw || '').slice(5, -6).trim().replace(hostnameRegex, '')))
      return new Set(urls)
    }).catch(error => {
      // eslint-disable-next-line no-console
      console.error(`Prerender.io: cannot read/parse ${sitemapPath}.`)
      throw error
    })
  }
}
