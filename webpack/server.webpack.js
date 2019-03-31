const path = require('path')
const webpack = require('webpack')

const baseOptions = require('./base.options')

const config = (env, options) => {
  const webpackConfig = {
    mode: options.mode,
    name: 'server',
    target: 'node',
    entry: path.resolve(__dirname, '../server', 'render.js'),
    resolve: baseOptions.resolve,
    output: {
      libraryTarget: 'commonjs2'
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.(sa|sc|c)ss$/,
          exclude: /node_modules/,
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader'}
          ]
        },
        {
          test: /\.(jpg|png|gif|svg|ico)$/,
          use: [{
            loader: 'url-loader'
          }]
        }
      ]
    }
  }

  if (options.mode === 'production') {
    webpackConfig.output = {
      libraryTarget: 'commonjs2',
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: path.resolve(__dirname, '../buildServer')
    }
  }

  return webpackConfig
}

module.exports = config
