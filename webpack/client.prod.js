const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin') // here so you can see what chunks are built
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const StatsPlugin = require('stats-webpack-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  mode: 'production',
  entry: {
    main: [path.resolve(__dirname, '../src/client/client.js')]
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../_build_prod/client'),
    publicPath: '/'
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: ExtractCssChunks.loader,
            options: {
              hot: true,
              reloadAll: true
            }
          },
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
    new StatsPlugin('stats.json'),
    new WriteFilePlugin(),
    new ExtractCssChunks(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new Dotenv({
      path: path.resolve(__dirname, '../.env'),
      systemvars: true,
      safe: false
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(__dirname, '../src/client/sw.js'),
      excludes: ['*hot-update*', '**/*.map', '**/stats.json']
    }),
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'vendor',
          priority: 1,
          test: /\.css$/,
          chunks: chunk => chunk.name === 'main',
          enforce: true
        },
        vendor: {
          name: 'vendor',
          chunks: chunk => chunk.name === 'main',
          reuseExistingChunk: true,
          priority: 1,
          test: module => /[\\/]node_modules[\\/]/.test(module.context),
          minChunks: 1,
          minSize: 0
        }
      }
    }
  }
}
