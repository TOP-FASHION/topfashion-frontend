import React from 'react'
import { Provider, useStaticRendering } from 'mobx-react'
import {renderToStaticMarkup} from 'react-dom/server'
import { StaticRouter } from 'react-router'
import createHistory from 'history/createMemoryHistory'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import App from '../src/decorators/Routes'
import allStore from '../src/core/Store'

useStaticRendering(true)

export default ({ clientStats }) => (req, res) => {
  const history = createHistory({ initialEntries: [req.path] })
  const context = {};

  const app = renderToStaticMarkup(
    <Provider {...allStore}>
      <StaticRouter location={req.originalUrl} context={context}>
        <App history={history} />
      </StaticRouter>
    </Provider>
  )

  const chunkNames = flushChunkNames()

  const {
    js, styles, scripts, stylesheets
  } = flushChunks(clientStats, {
    chunkNames
  })

  console.log('PATH', req.path)
  console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames)
  console.log('SCRIPTS SERVED', scripts)
  console.log('STYLESHEETS SERVED', stylesheets)

  res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>react-universal-component-boilerplate</title>
          ${styles}
        </head>
        <body>
          <div id="root">${app}</div>
        </body>
        ${js}
      </html>`
  )
}
