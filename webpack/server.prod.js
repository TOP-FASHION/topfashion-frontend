const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin')
const postcssPresetEnv = require('postcss-preset-env')

const res = p => path.resolve(__dirname, p)

const nodeModules = res('../node_modules')
const entry = res('../src/server/middlewares/render/index.js')
const entryApp = res('../src/server/index.js')
const output = res('../_build_prod/server')

const BUILT_ASSETS_FOLDER = '/'

// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
const externals = fs
  .readdirSync(nodeModules)
  .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`
    return externals
  }, {})

externals['react-dom/server'] = 'commonjs react-dom/server'

module.exports = {
  name: 'server',
  devtool: 'source-map',
  target: 'node',
  mode: 'production',
  node: {
    __dirname: false,
    __filename: false
  },
  entry: {
    main: ['babel-polyfill', entry],
    app: ['babel-polyfill', entryApp]
  },
  externals,
  output: {
    path: output,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: BUILT_ASSETS_FOLDER
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.tsx$/,
        use: 'ts-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
              exportOnlyLocals: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [postcssPresetEnv()]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|svg|ico)$/,
        use: [{
          loader: 'url-loader'
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.css', '.scss']
  },
  plugins: [
    new WriteFilePlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}
