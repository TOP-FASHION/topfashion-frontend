const path = require('path')
const autoPrefixer = require('autoprefixer')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const cssnano = require('cssnano')
const webpack = require('webpack')
const webpackProgressBar = require('progress-bar-webpack-plugin')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const baseOptions = require('./base.options')

const config = (env, options) => {
  const webpackConfig = {
    mode: options.mode,
    name: 'client',
    target: 'web',
    devtool: (options.mode === 'production') ? false : 'inline-source-map',
    resolve: baseOptions.resolve,
    entry: [
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      path.resolve(__dirname, '../src', 'index.js')
    ],
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: path.resolve(__dirname, '../tmp/client'),
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            ExtractCssChunks.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoPrefixer,
                  cssnano({
                    preset: 'default'
                  })
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
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
    plugins: [
      new WriteFilePlugin(),
      new ExtractCssChunks(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }),
      new LodashModuleReplacementPlugin()
    ]
  }

  if (env.NODE_ENV === 'production') {
    webpackConfig.plugins.push(
      new webpackProgressBar({
        summary: true
      })
    )
    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        openAnalyzer: false
      })
    )
  }

  return webpackConfig
}

module.exports = config
