require('dotenv').config()
const express = require('express')
const https = require('https')
const path = require('path')
const clientConfig = require('./../webpack/client.webpack')
const serverConfig = require('./../webpack/server.webpack')

const app = express()

const NODE_ENV = process.env.NODE_ENV

const clientWebpack = clientConfig(process.env, {mode: NODE_ENV})
const publicPath = clientWebpack.output.publicPath
const outputPath = clientWebpack.output.path
const serverWebpack = serverConfig(process.env, {mode: NODE_ENV})

const serverKey = `
-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCnBbWbNENo4Le91G6Xr7aFDi/eW7smUVLr+oj08FJ46uKbFBjx
gLEH7W/nSec7IFoovYn94JXLE0nODGHMjFc88o7svU+B5BZvYE4TLlF9cyVj3TB4
+ECcMCZra4W97VyJrc6jWF0x7P6Sdm6EJ107F4vGjFih3NrBfPSgcda9qQIDAQAB
AoGAWdKTOTWhLwzzI87T7xWbVfEsQywX+OJxcuEYuIlqAQdo+LeVNoPcMQQ7UyqG
hWC/u/s68+LNDBqCbaJxEh1DaHAOZUnUIBgJ6IMtCaFr2lhzI7rqjuMk/3/IZsJh
3mgIY2BlZn6KTBi0J6HYuuZXL/mJAyFObv6yQ5sbdIqQI4ECQQDVqiKKDJMY8aTf
ZXHpM7pTdHAg6zkrsklGXwgW8+tqcrnQxoEXnRoh0wTyGLW0jqCQVZ0lnGk3Sb8e
i1+HLLAZAkEAyB20I7jRqnrhbwHxyCrCGPJ9IzaSO+fEu6CvOGl1/YlHIXR7vSy0
sPRc2+/Z8iu9jfO/S22IwvWvhO+dgsjsEQJBAMgxge0w/P5JIz7BUSq8cd9R4OGn
I8kCYk+SKQVAhBoX5mxsIXZbl6mLiz2+0zmazWyPGw+rbpYD/hODaP1BbLkCQDxr
U3cxlwQc47GLab+gwUec9xFJqa8yk+B+bEjg9oHdD7/XFoEQXWHL9bll2mzWrf2M
6WXRpWgPm7XMTscs+LECQFqR0nd3oGwqqM5KPjEdiRBkbI0vdhTqQeLSC3cwJDtu
Tfgq8jKG4mzLrAvyuT56NKbrcpOz7NgAiorsxH2CScA=
-----END RSA PRIVATE KEY-----
`

const serverCrt = `
-----BEGIN CERTIFICATE-----
MIICATCCAWoCCQCiQNvLB3X9PjANBgkqhkiG9w0BAQUFADBFMQswCQYDVQQGEwJS
VTETMBEGA1UECBMKU29tZS1TdGF0ZTEhMB8GA1UEChMYSW50ZXJuZXQgV2lkZ2l0
cyBQdHkgTHRkMB4XDTE3MDkxODEzMDMyNloXDTE4MDkxODEzMDMyNlowRTELMAkG
A1UEBhMCUlUxEzARBgNVBAgTClNvbWUtU3RhdGUxITAfBgNVBAoTGEludGVybmV0
IFdpZGdpdHMgUHR5IEx0ZDCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEApwW1
mzRDaOC3vdRul6+2hQ4v3lu7JlFS6/qI9PBSeOrimxQY8YCxB+1v50nnOyBaKL2J
/eCVyxNJzgxhzIxXPPKO7L1PgeQWb2BOEy5RfXMlY90wePhAnDAma2uFve1cia3O
o1hdMez+knZuhCddOxeLxoxYodzawXz0oHHWvakCAwEAATANBgkqhkiG9w0BAQUF
AAOBgQA9RqXDtTvI9K1FdnKAernjNkuhPklkoWa0p5tp8HSlZQXzELTQCn4TMqBB
DGWP+a5LNwBJWtY3RbbvUyYCm6912D3eSQ+vLq2u0NrgAIJyLOPxiVA38IPmox85
/BnKUueiSFLxV9SONuXfZFR7R25hxcEFmxAaVARsZAGmuEeZHw==
-----END CERTIFICATE-----
`

let isBuilt = false

const options = {
  key: serverKey,
  cert: serverCrt
}

const done = () => !isBuilt && https.createServer(options, app).listen(process.env.HTTPS_PORT, () => {
  isBuilt = true
  console.log(`Listening @ https://localhost:${process.env.HTTPS_PORT}/`)
})

if (NODE_ENV === 'production') {
  const path = require('path')
  const webpack = require('webpack')

  webpack([clientWebpack, serverWebpack]).watch({}, (err, stats) => {
    if (err) {
      throw new Error(err)
    }

    const clientStats = stats.toJson().children[0]
    const serverRender = require('../buildServer/main.js').default

    app.use(publicPath, express.static(outputPath))
    app.use(serverRender({ clientStats }))
    done()
  })
} else {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware')


  const compiler = webpack(
    [
      clientWebpack,
      serverWebpack
    ]
  )
  const clientCompiler = compiler.compilers[0]
  const options = { publicPath, stats: { colors: true }, mode: NODE_ENV}

  app.use(webpackDevMiddleware(compiler, options))
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(webpackHotServerMiddleware(compiler))

  compiler.plugin('done', done)
}

