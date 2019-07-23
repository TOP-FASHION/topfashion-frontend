const fs = require('fs')
const {promisify} = require('util')
const {default: refreshableData} = require('../../utils/refreshableData')
const normalizeServerRequestUrl = require('../../utils/normalizeServerRequestUrl')

const readFileAsync = promisify(fs.readFile)

const SNAPSHOTS_TTL_DEFAULT_SEC = 8 * 60 * 60 // 8 hours
const SNAPSHOTS_BOTS_REGEX_DEFAULT = 'bot|crawler|baiduspider|80legs|adsbot-google|008|abachobot|accoona-ai-agent|addsugarspiderbot|anyapexbot|arachmo|b-l-i-t-z-b-o-t|becomebot|beslistbot|billybobbot|bimbot|bingbot|blitzbot|boitho.com-dc|boitho.com-robot|btbot|catchbot|cerberian drtrs|charlotte|converacrawler|cosmos|covario ids|dataparksearch|diamondbot|discobot|dotbot|emeraldshield.com |webbot|esperanzabot|exabot|fast enterprise crawler|fast-webcrawler|fdse robot|findlinks|furlbot|fyberspider|g2crawler|gaisbot|galaxybot|geniebot|gigabot|girafabot|googlebot|googlebot-image|gurujibot|happyfunbot|hl_ftien_spider|holmes|htdig|iaskspider|ia_archiver|iccrawler|ichiro|igdespyder|irlbot|issuecrawler|jaxified bot|jyxobot|koepabot|l.webis|lapozzbot|larbin|ldspider|lexxebot|linguee bot|linkwalker|lmspider|lwp-trivial|mabontland|magpie-crawler|mediapartners-google|mj12bot|mnogosearch|mogimogi|mojeekbot|moreoverbot|morning paper|msnbot|msrbot|mvaclient|mxbot|netresearchserver|netseer crawler|newsgator|ng-search|nicebot|noxtrumbot|nusearch spider|nutchcvs|nymesis|obot|oegp|omgilibot|omniexplorer_bot|oozbot|orbiter|pagebiteshyperbot|peew|polybot|pompos|postpost|psbot|pycurl|pingdom.com_bot_version|qseero|radian6|rampybot|rufusbot|sandcrawler|sbider|scoutjet|scrubby|searchsight|seekbot|semanticdiscovery|sensis web crawler|seochat::bot|seznambot|shim-crawler|shopwiki|shoula robot|silk|sitebot|snappy|sogou spider|sosospider|speedy spider|sqworm|stackrambler|suggybot|surveybot|synoobot|teoma|terrawizbot|thesubot|thumbnail.cz robot|tineye|truwogps|turnitinbot|tweetedtimes bot|twengabot|updated|urlfilebot|vagabondo|voilabot|vortex|voyager|vyu2|webcollage|websquash.com|wf84|wofindeich robot|womlpefactory|xaldon_webspider|yacy|yahoo! slurp|yahoo! slurp china|yahooseeker|yahooseeker-testing|yandexbot|yandeximages|yasaklibot|yeti|yodaobot|yooglifetchagent|youdaobot|zao|zealbot|zspider|zyborg'
const SNAPSHOTS_RETRYING_ON_ERROR_SEC = 5 * 60 // 5 minutes

/**
 * Middleware to work with Snapshots (for search engine bots)
 * @param {String} [path='']
 * @param {Object} [options={}]
 * @param {Number} [options.ttl]
 * @param {String} [options.botsRegex]
 * @param {Boolean} [options.debugMode]
 * @return {Function}
 * @information
 * Manual script to generate a snapshot:
 * JSON.stringify((text => text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''))(document.documentElement.outerHTML))
 */
module.exports = (path = '', options = {}) => {
  const snapshotsPath = '' + (path || '')

  // Skip this middleware if path to the snapshots.json file is not presented
  if (!snapshotsPath) {
    return (req, res, next) => {
      next()
    }
  }

  const snapshotsTtlOptionParsed = parseFloat(options.ttl)
  const snapshotsTtl = !isNaN(snapshotsTtlOptionParsed) ? snapshotsTtlOptionParsed : SNAPSHOTS_TTL_DEFAULT_SEC
  const snapshotsBotsRegex = new RegExp(options.botsRegex || SNAPSHOTS_BOTS_REGEX_DEFAULT, 'i')
  const debugMode = !!options.debugMode
  const initiallyAwaitingPromises = []

  const getSnapshotsMap = refreshableData(snapshotsFetcher, {
    ttlSec: snapshotsTtl,
    initialData: new Map(),
    initiallyOutdated: true,
    autoRefresh: true,
    retryingDelaySec: SNAPSHOTS_RETRYING_ON_ERROR_SEC,
    debugMode: debugMode
  })

  initiallyAwaitingPromises.push(getSnapshotsMap.ongoingFetch)

  // eslint-disable-next-line no-console
  console.log(`Middleware "Snapshots" is enabled.`)

  return async (req, res, next) => {
    try {
      await Promise.all(initiallyAwaitingPromises)
      return snapshotsMiddleware(req, res, next)
    } catch (error) {
      next(error)
    }
  }

  // FUNCTIONS

  function snapshotsMiddleware (req, res, next) {
    if (isSnapshotRequested(req)) {
      const snapshotsMap = getSnapshotsMap()
      const snapshot = snapshotsMap.get(normalizeServerRequestUrl(req.originalUrl)) || snapshotsMap.get(normalizeServerRequestUrl(req.path))

      if (snapshot) {
        res.write(snapshot)
        res.end()
        return
      }
    }

    next()
  }

  function snapshotsFetcher () {
    return readFileAsync(snapshotsPath, 'utf8').then(data => {
      const parsedJson = JSON.parse(data)
      const map = new Map()

      for (const url in parsedJson) {
        const snapshot = parsedJson[url]
        map.set(normalizeServerRequestUrl(url), snapshot)
      }

      return map
    }).catch(error => {
      // eslint-disable-next-line no-console
      console.error(`Snapshots: cannot read/parse ${snapshotsPath}.`)
      throw error
    })
  }

  function isSnapshotRequested (req) {
    return isBot(req.header('user-agent')) || req.header('x-snapshot-version') === 'true' || req.cookies['x-snapshot-version'] === 'true'
  }

  function isBot (userAgent = '') {
    return snapshotsBotsRegex.test('' + userAgent)
  }
}
