import React from 'react'
import PropTypes from 'prop-types'
import { Provider, useStaticRendering } from 'mobx-react'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import createHistory from 'history/createMemoryHistory'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { addLocaleData, IntlProvider } from 'react-intl'
import acceptLanguage from 'accept-language'
import en from 'react-intl/locale-data/en'
import ru from 'react-intl/locale-data/cs'
import allStore from '../src/core/Store'
import App from '../src/decorators/Routes'
import i18n, { locale } from '../src/locales'

useStaticRendering(true)

acceptLanguage.languages(['en', 'ru'])
addLocaleData([...en, ...ru])

export default ({ clientStats }) => (req, res) => {
  const history = createHistory({ initialEntries: [req.path] })
  const context = {}
  const languages = getLanguages()
  const {language} = detectLanguageParams(req, languages)

  const app = renderToStaticMarkup(
    <Provider {...allStore}>
      <IntlProvider locale={locale} messages={i18n[locale]}>
        <StaticRouter location={req.originalUrl} context={context}>
          <App history={history} />
        </StaticRouter>
      </IntlProvider>
    </Provider>
  )

  const chunkNames = flushChunkNames()

  const { js, styles, scripts, stylesheets } = flushChunks(clientStats, {
    chunkNames
  })

  const extendedStylesheets = stylesheets.slice(0)
  const customerCssIndex = extendedStylesheets.push(null) - 1
  const hotfixesCssIndex = extendedStylesheets.push(null) - 1

  // Add "customer.css" file
  extendedStylesheets[customerCssIndex] = `static/customer.css`
  // Add "fontawesome.css" file
  extendedStylesheets[hotfixesCssIndex] = `static/fontawesome.css`

  const bodyStylesheets = renderToStaticMarkup(
    <AppStylesheets list={extendedStylesheets} />
  )

  // First bytes (ASAP)
  res.setHeader('Content-Type', 'text/html')
  res.cookie('_lang', language, {maxAge: 900000})
  res.write(`<!doctype html>\n<html lang="${language}">${headHtml}`)

  res.send(
    `<!doctype html>
      <html dir="ltr">
        <head>
          <meta charset="utf-8">
          <title>react-universal-component-boilerplate</title>
          ${bodyStylesheets}
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i">
        </head>
        <body>
          <div id="root">${app}</div>
        </body>
        ${js}
      </html>`
  )
}

class AppStylesheets extends React.Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.string)
  }

  static defaultProps = {
    list: []
  }

  render () {
    return (
      <React.Fragment>
        {this.props.list.map(name => (
          <link rel='stylesheet' href={`/${name}`} key={name} />
        ))}
      </React.Fragment>
    )
  }
}
