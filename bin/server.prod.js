#!/usr/bin/env node

require('dotenv').config()
const express = require('express')
const app = require('./server/app.js').app
const path = require('path')

const publicPath = '/'
const outputPath = path.resolve(__dirname, 'client')

const clientStats = require('./client/stats.json')
const serverRender = require('./server/main.js').default

// e.g. "main.f767256c7b6d75f7740e51b1e404a2c6.css.map"
const hashedFilesRegexp = /[^/.]\.[0-9a-f]{5,}\.(?:js|css|json)(?:\.map)?$/

const DEBUG_MODE = process.env.DEBUG_MODE === 'true'

app.use(publicPath, express.static(outputPath, {
  maxAge: '2m',
  setHeaders: (res, path) => {
    if (hashedFilesRegexp.test(path)) {
      // All files with hashes we cache for 1 month
      res.setHeader('Cache-Control', 'public, max-age=2592000')
    }
  }
}))

app.use(serverRender({ clientStats }))

// Error handler
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(DEBUG_MODE ? err : '' + err)
})

app.listen(process.env.PORT || process.env.APP_PORT || 5000, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening @ http://localhost:${process.env.APP_PORT}/`)
})
