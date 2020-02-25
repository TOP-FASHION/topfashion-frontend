const path = require('path')
const express = require('express')
const compression = require('compression')
const httpProxy = require('http-proxy')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const allToGet = require('./middlewares/allToGet')

const app = express()
const proxy = httpProxy.createProxyServer()

app.disable('x-powered-by')

app.use(compression())
app.use(cors())

app.use('/wp-json/', (req, res) => {
  proxy.web(
    req,
    res,
    { target: process.env.API_URL_WP, changeOrigin: true, secure: false },
    proxyError => {
      res.status(500).json({ error: 'ProxyException', details: proxyError })
    }
  )
})

app.use('/api/', (req, res) => {
  proxy.web(
    req,
    res,
    { target: process.env.API_URL_AUTH, changeOrigin: true, secure: false },
    proxyError => {
      res.status(500).json({ error: 'ProxyException', details: proxyError })
    }
  )
})

app.use('/graphql/', (req, res) => {
  proxy.web(
    req,
    res,
    { target: process.env.GRAPHQL_URL, changeOrigin: true, secure: false },
    proxyError => {
      res.status(500).json({ error: 'ProxyException', details: proxyError })
    }
  )
})

app.use(
  '/',
  express.static(path.resolve(__dirname, process.env.STATIC_PATH))
)

app.use(
  '/public',
  express.static(path.resolve(__dirname, process.env.PUBLIC_PATH))
)

app.use(allToGet())
app.use(cookieParser())
app.use(bodyParser.json())

// Assets
app.use(
  '/assets',
  express.static(path.join(__dirname, '..', process.env.PUBLIC_PATH), {
    maxAge: '2m' // 2 minutes
  })
)

// Static files
app.use(
  express.static(path.join(__dirname, '..', process.env.STATIC_PATH), {
    maxAge: '2m'
  })
)

module.exports = {
  app
}
