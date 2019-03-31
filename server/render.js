import React from 'react'
import ReactDom from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import { StaticRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import flushChunks from 'webpack-flush-chunks'

import App from './../src/decorators'
import createReduxStore from '../src/services/store'

const store = createReduxStore()

export default ({ clientStats }) => (req, res) => {
  const initialState = JSON.stringify(store.getState())
  const context = {}
  const app = ReactDom.renderToString(
    <Provider store={store}>
      <Router
        location={req.url}
        context={context}
      >
        <App />
      </Router>
    </Provider>
  )

  if (context.url) {
    res.redirect(301, context.url)
  }

  const chunkNames = flushChunkNames()

  const {
    js,
    styles,
    cssHash,
    scripts,
    stylesheets
  } = flushChunks(clientStats, { chunkNames })

  console.log('Dynamic Chunk Names Rendered', chunkNames)
  console.log('Scripts', scripts)
  console.log('Styles', stylesheets)

  res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset='utf-8'>
          <title>React universal from scratch</title>
          ${styles}
        </head>
        <body>
          <script>
            window.__INITIAL_STATE__ = ${initialState};
          </script>
          <div id='root'>${app}</div>
          ${cssHash}
          ${js}
        </body>
      </html>`
  )
}
