import React from 'react'
import { Provider, useStaticRendering } from 'mobx-react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { createMemoryHistory } from 'history'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import Head from '../src/helpers/Head'
import Body from '../src/helpers/Body'
import { addLocaleData, IntlProvider } from 'react-intl'
import acceptLanguage from 'accept-language'
import en from 'react-intl/locale-data/en'
import ru from 'react-intl/locale-data/ru'
import allStore from '../src/core/Store'
// import App from '../src/decorators'

const LOCALES = {
  en: en,
  ru: ru
}

useStaticRendering(true)

// Add all locales
const AVAILABLE_LOCALES = ['en', 'ru']

addLocaleData([...en, ...ru])

const messages = {}

AVAILABLE_LOCALES.forEach(locale => {
  messages[locale] = require(`../src/translations/locales/${locale}.json`)
})

acceptLanguage.languages(AVAILABLE_LOCALES)

export default ({ clientStats }) => (req, res) => {
  const history = createMemoryHistory({ initialEntries: [req.path] })
  const context = {}
  const { language } = detectLanguageParams(req, AVAILABLE_LOCALES)
  const offlineMode = req.header('x-offline-mode') === 'true'
  const messagesBylocale = messages[language]
  console.log('messagesBylocale', messagesBylocale)
  // Configure React-intl
  const initialNow = Date.now()

  // const app = renderToString(
  //   <Provider {...allStore}>
  //     <IntlProvider initialNow={initialNow} locale={language} messages={messages[language]}>
  //       <StaticRouter location={req.originalUrl} context={context}>
  //         <App history={history} />
  //       </StaticRouter>
  //     </IntlProvider>
  //   </Provider>
  // )

  const chunkNames = flushChunkNames()

  const { scripts, stylesheets } = flushChunks(clientStats, {
    chunkNames
  })

  const extendedStylesheets = stylesheets.slice(0)
  const fontawesomeCssIndex = extendedStylesheets.push(null) - 1

  // Add "fontawesome.css" file
  extendedStylesheets[fontawesomeCssIndex] = `public/css/fontawesome.css`

  const headHtml = renderToStaticMarkup(
    <Head
      siteName={'Сайт'}
      siteDescription={'описание'}
      stylesheets={extendedStylesheets}
    />
  )

  // First bytes (ASAP)
  res.setHeader('Content-Type', 'text/html')
  res.cookie('_lang', language, { maxAge: 900000 })
  res.write(`<!doctype html>\n<html lang="${language}">${headHtml}`)

  // Wait generation of the application state
  const applicationState = generateApplicationState()

  const bodyHtml = renderToStaticMarkup(
    <Body
      scripts={scripts}
      state={applicationState}
      noScriptText={messagesBylocale['app.common.noScript']}
      className={offlineOnly('offline')}
      html={offlineOnly(`<span>${messagesBylocale['app.common.offlineMode']}</span>`)}
    />
  )

  // Last bytes
  res.write(`${bodyHtml}</html>`)
  res.end()

  function generateApplicationState () {
    const serverTime = Date.now()

    return {
      now: serverTime,
      locale: language,
      messages: messagesBylocale,
      localeData: LOCALES[language]
    }
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
    return (
      cookieLocale || acceptLanguage.get(req.headers['accept-language']) || 'en'
    )
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
