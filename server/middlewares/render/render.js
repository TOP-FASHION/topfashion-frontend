import React from 'react'
import {useStaticRendering} from 'mobx-react'
import {addLocaleData} from 'react-intl'
import acceptLanguage from 'accept-language'
import {renderToStaticMarkup} from 'react-dom/server'
import flushChunks from 'webpack-flush-chunks'
import Head from '../../../helpers/Head'
import Body from '../../../helpers/Body'
import axios from 'axios'
import calculateChecksum from '../../../utils/calculateChecksum'
import refreshableData from '../../../utils/refreshableData'
import loadTranslationsOriginal from './loadTranslations'

const API_PREFIX = '/billfold-api'
const CMS_PREFIX = '/cms'

// Order by priority
const OUR_SUPPORTED_LOCALES = [
  'en', 'en_uk', 'fr', 'it', 'es', 'pt_br', 'el', 'de', 'pl', 'pt', 'ru', 'nl', 'sv', 'tr', 'es_419', 'da', 'bg', 'ja', 'no', 'ar', 'fa', 'zh', 'id', 'hu', 'fi', 'ro', 'mg'
]

const CMS_CUSTOMER_CSS_PATH = '/customer.css'
const CMS_HOTFIXES_CSS_PATH = '/hotfixes.css'

const AXIOS_COMMON_SETTINGS = {
  maxRedirects: 0 // prevent following redirects (to prevent loop)
}

const REFRESHABLE_DATA_COMMON_SETTINGS = {
  initiallyOutdated: true,
  autoRefresh: true,
  retryingDelaySec: 60
}

const COMMON_REQUEST_TTL_DEFAULT_SEC = 5 * 60
const CMS_FILE_CHECKSUM_TTL_DEFAULT_SEC = 5 * 60

/**
 * Middleware to render initial page for the application
 */
export default ({clientStats}) => {
  // It would be nice if we replace global environment variables by local middleware options
  // (but until then, think that environment variables are options)
  const envVariables = process.env

  const isHttpsConnectionUsed = envVariables.HTTPS === 'true'
  const applicationUrlWithoutPort = isHttpsConnectionUsed ? `${envVariables.HTTPS_HOST}` : `${envVariables.APP_HOST}`
  const connectionPort = isHttpsConnectionUsed ? `${envVariables.HTTPS_PORT}` : `${envVariables.APP_PORT}`
  const applicationUrl = `${applicationUrlWithoutPort}:${connectionPort}`
  const apiUrl = `${applicationUrl}${API_PREFIX}`
  const cmsUrl = `${applicationUrl}${CMS_PREFIX}`
  const commonRequestTtlSecParsed = parseFloat(envVariables.REQUESTS_TTL)
  const commonRequestTtlSec = !isNaN(commonRequestTtlSecParsed) ? commonRequestTtlSecParsed : COMMON_REQUEST_TTL_DEFAULT_SEC
  const cmsFileChecksumTtlSecParsed = parseFloat(envVariables.CMS_FILE_CHECKSUM_TTL)
  const cmsFileChecksumTtlSec = !isNaN(cmsFileChecksumTtlSecParsed) ? cmsFileChecksumTtlSecParsed : CMS_FILE_CHECKSUM_TTL_DEFAULT_SEC
  const debugMode = envVariables.DEBUG_MODE === 'true'

  // To prevent memory leaks on server when calling observer (https://github.com/mobxjs/mobx-react/issues/140)
  useStaticRendering(true)

  const localesData = addReactIntlLocales(OUR_SUPPORTED_LOCALES)
  acceptLanguage.languages(normalizeOurLocales(OUR_SUPPORTED_LOCALES))

  const {scripts, stylesheets, cssHashRaw} = flushChunks(clientStats)
  const extendedStylesheets = stylesheets.slice(0)

  // Reserve place for the "customer.css" and "hotfixes.css" files and keep indices
  // (we do it so to prevent heavy executions e.g. array cloning in the middleware)
  const customerCssIndex = extendedStylesheets.push(null) - 1
  const hotfixesCssIndex = extendedStylesheets.push(null) - 1

  // Fetch available languages (and update in background)
  const getLanguages = refreshableData(languagesFetcher, {
    ...REFRESHABLE_DATA_COMMON_SETTINGS,
    ttlSec: commonRequestTtlSec,
    initialData: [],
    debugMode
  })

  // Fetch application settings (and update in background)
  const getCmsSettings = refreshableData(cmsSettingsFetcher, {
    ...REFRESHABLE_DATA_COMMON_SETTINGS,
    ttlSec: commonRequestTtlSec,
    initialData: {},
    debugMode
  })

  // Fetch active pages (and update in background)
  const getActivePages = refreshableData(activePagesFetcher, {
    ...REFRESHABLE_DATA_COMMON_SETTINGS,
    ttlSec: commonRequestTtlSec,
    initialData: [],
    debugMode
  })

  // Fetch translations (and update in background)
  const getTranslations = refreshableData(translationsFetcher, {
    ...REFRESHABLE_DATA_COMMON_SETTINGS,
    ttlSec: commonRequestTtlSec,
    initialData: {},
    debugMode
  })

  // Calculate checksums for some files (and update in background)
  const getCmsFilesChecksums = refreshableData(createCmsFilesChecksumsFetcher([
    CMS_CUSTOMER_CSS_PATH,
    CMS_HOTFIXES_CSS_PATH
  ]), {
    ...REFRESHABLE_DATA_COMMON_SETTINGS,
    ttlSec: cmsFileChecksumTtlSec,
    initialData: {
      get () {},
      getShort () {}
    },
    debugMode
  })

  const initiallyAwaitingPromises = [
    getLanguages.ongoingFetch,
    getCmsSettings.ongoingFetch,
    getActivePages.ongoingFetch,
    getTranslations.ongoingFetch,
    getCmsFilesChecksums.ongoingFetch
  ]

  return async (req, res, next) => {
    try {
      await Promise.all(initiallyAwaitingPromises)
      return renderMiddleware(req, res, next)
    } catch (error) {
      next(error)
    }
  }

  // FUNCTIONS

  // The main application renderer
  async function renderMiddleware (req, res) {
    const languages = getLanguages()
    const cmsSettings = getCmsSettings()
    const activePages = getActivePages()
    const translations = getTranslations()
    const cmsFilesChecksums = getCmsFilesChecksums()
    const {language} = detectLanguageParams(req, languages)
    const messages = translations[language] || {}
    const offlineMode = req.header('x-offline-mode') === 'true'

    const headHtml = renderToStaticMarkup(
      <Head
        url={`https://${parseHostName(messages.$HOST_NAME)}${req.originalUrl}`}
        language={language}
        languages={languages}
        siteName={messages.$SITE_NAME}
        siteDescription={messages.$SITE_DESCRIPTION}
      />
    )

    // First bytes (ASAP)
    res.setHeader('Content-Type', 'text/html')
    res.cookie('_lang', language, {maxAge: 900000})
    res.write(`<!doctype html>\n<html lang="${language}">${headHtml}`)

    // Add "customer.css" file
    extendedStylesheets[customerCssIndex] = `cms/customer.css?${cmsFilesChecksums.getShort(CMS_CUSTOMER_CSS_PATH)}`
    // Add "hotfixes.css" file
    extendedStylesheets[hotfixesCssIndex] = `cms/hotfixes.css?${cmsFilesChecksums.getShort(CMS_HOTFIXES_CSS_PATH)}`

    // Wait generation of the application state
    const applicationState = await onlineOnly(() => generateApplicationState())

    const bodyHtml = renderToStaticMarkup(
      <Body
        scripts={onlineOnly(scripts)}
        stylesheets={extendedStylesheets}
        cssHash={onlineOnly(cssHashRaw)}
        state={applicationState}
        noScriptText={messages['app.common.noScript']}
        className={offlineOnly('offline')}
        html={offlineOnly(`<span>${messages['app.common.offlineMode']}</span>`)}
      />
    )

    // Last bytes
    res.write(`${bodyHtml}</html>`)
    res.end()

    // FUNCTIONS

    async function generateApplicationState () {
      // Wait information about the user balance
      const balance = await loadBalance(req)
      const serverTime = Date.now()

      return {
        now: serverTime,
        locale: language,
        messages,
        localeData: localesData[language],
        core: {
          cache: {
            // Workaround to provide predefined calls data to the client
            '/billfold-api/config/languages|json|undefined': {languages},
            '/cms/settings.json|json|undefined': cmsSettings,
            '/cms/pages/activePages.json|json|undefined': activePages,
            '/billfold-api/player/balance|json|undefined': balance,
            '/billfold-api/player/language|json|undefined': {success: true, _lang: language}
          },
          timeout: {
            // Workaround to provide predefined calls data to the client
            '/billfold-api/config/languages|json|undefined': serverTime,
            '/cms/settings.json|json|undefined': serverTime,
            '/cms/pages/activePages.json|json|undefined': serverTime,
            '/billfold-api/player/balance|json|undefined': serverTime,
            '/billfold-api/player/language|json|undefined': serverTime
          },
          serverTime
        }
      }
    }

    function onlineOnly (onlineData, offlineData) {
      const onlineDataFn = typeof onlineData === 'function' ? onlineData : () => onlineData
      const offlineDataFn = typeof offlineData === 'function' ? offlineData : () => offlineData
      return offlineMode ? offlineDataFn() : onlineDataFn()
    }

    function offlineOnly (offlineData, onlineData) {
      return onlineOnly(onlineData, offlineData)
    }
  }

  function languagesFetcher () {
    const url = `${apiUrl}/config/languages`
    return axios.get(url, {...AXIOS_COMMON_SETTINGS})
      .then(response => ((response || {}).data || {}).languages || [])
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(`Renderer: cannot load ${url}.`)
        throw error
      })
  }

  function cmsSettingsFetcher () {
    const url = `${cmsUrl}/settings.json`
    return axios.get(url, {...AXIOS_COMMON_SETTINGS})
      .then(response => (response || {}).data || {})
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(`Renderer: cannot load ${url}.`)
        throw error
      })
  }

  function activePagesFetcher () {
    const url = `${cmsUrl}/pages/activePages.json`
    return axios.get(url, {...AXIOS_COMMON_SETTINGS})
      .then(response => (response || {}).data || [])
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(`Renderer: cannot load ${url}.`)
        throw error
      })
  }

  function translationsFetcher () {
    const url = `${cmsUrl}/translations.csv`
    return loadTranslationsOriginal(url, {
      axiosConfig: {...AXIOS_COMMON_SETTINGS},
      // We keep default translations for global variables to use them during the static markup rendering
      keepDefaultTranslationsFor: [
        '$HOST_NAME',
        '$SITE_DESCRIPTION',
        '$SITE_NAME',
        'app.common.noScript',
        'app.common.offlineMode'
      ],
      debugMode
    }).catch(error => {
      // eslint-disable-next-line no-console
      console.error(`Renderer: cannot load ${url}.`)
      throw error
    })
  }

  function cmsFilesChecksumsFetcher (files = []) {
    const checksums = {}
    const checksumsPromises = []

    files.forEach(file => {
      const checksumPromise = loadCmsFileAsString(file)
        .then(fileData => {
          const checksum = calculateChecksum(fileData) || ''

          checksums[file] = {
            full: checksum,
            short: checksum.slice(0, 8)
          }
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(`Renderer: cannot calculate checksum for ${file}.`)
          throw error
        })

      checksumsPromises.push(checksumPromise)
    })

    return Promise.all(checksumsPromises).then(() => ({
      get: id => checksums[id].full,
      getShort: id => checksums[id].short
    }))
  }

  function createCmsFilesChecksumsFetcher (files) {
    return () => cmsFilesChecksumsFetcher(files)
  }

  function detectLanguageParams (req, languages) {
    const langFromUrl = (req.url.split(/[/?]/) || [])[1]
    if (isCorrectLang(langFromUrl)) {
      return {
        language: langFromUrl,
        source: 'url'
      }
    }

    const langFromLocale = detectLocale(req)
    if (isCorrectLang(langFromLocale)) {
      return {
        language: langFromLocale,
        source: 'locale'
      }
    }

    return {
      language: 'en'
    }

    function isCorrectLang (lang) {
      return !!(lang && ~languages.indexOf(lang))
    }
  }

  // Detects locale from cookie or from header AcceptLanguage
  function detectLocale (req) {
    const cookieLocale = req.cookies._lang
    return cookieLocale || acceptLanguage.get(req.headers['accept-language']) || 'en'
  }

  function normalizeOurLocales (locales = []) {
    return locales.map(locale => {
      // Convert incorrect names
      return normalizeOurLocale(locale)
    }).filter((locale, i, arr) => {
      // Remove duplicates
      return arr.indexOf(locale) === i
    })
  }

  function normalizeOurLocale (locale = '') {
    switch (locale) {
      case 'en_uk':
        return 'uk'
      case 'es_419':
        return 'es'
      case 'pt_br':
        return 'pt'
      default:
        return locale
    }
  }

  function addReactIntlLocales (locales = []) {
    let reactIntlLocalesDataObj = {}
    let reactIntlLocalesDataCombined = []
    let localesDataForEachLocale = {}

    locales.forEach(locale => {
      const normalizedLocale = normalizeOurLocale(locale)

      if (!reactIntlLocalesDataObj.hasOwnProperty(normalizedLocale)) {
        const localeData = require(`react-intl/locale-data/${normalizedLocale}`)
        reactIntlLocalesDataObj[normalizedLocale] = localeData
        reactIntlLocalesDataCombined = reactIntlLocalesDataCombined.concat(localeData)
      }

      localesDataForEachLocale[locale] = reactIntlLocalesDataObj[normalizedLocale]
    })

    addLocaleData(reactIntlLocalesDataCombined)
    return localesDataForEachLocale
  }

  function loadBalance (req) {
    const url = `${apiUrl}/player/balance`
    const headers = {}
    const requestCookie = (req.headers || {}).cookie || ''

    if (requestCookie) {
      // To take session, language and other data
      headers.cookie = requestCookie
    }

    return axios.get(url, {
      ...AXIOS_COMMON_SETTINGS,
      headers
    }).then(response => (
      (response || {}).data || {}
    )).catch(error => {
      // eslint-disable-next-line no-console
      console.error('Renderer: cannot load user balance.', debugMode ? error : '' + error)
      return {}
    })
  }

  function parseHostName (string = '') {
    const stringNormalized = '' + (string || '')
    const hostNameParsed = (stringNormalized.match(/^(?:(?:https?:)?\/\/)?([^/]+)/) || [])[1] || ''
    return hostNameParsed.toLowerCase()
  }

  function loadCmsFileAsString (filePath) {
    const url = `${cmsUrl}${filePath}`
    return axios.get(url, {
      ...AXIOS_COMMON_SETTINGS,
      responseType: 'text'
    }).then(response => (
      // Convert to string
      '' + ((response || {}).data || '')
    ))
  }
}
