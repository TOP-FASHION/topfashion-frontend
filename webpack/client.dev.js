const path = require('path')
const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin') // here so you can see what chunks are built
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const postcssPresetEnv = require('postcss-preset-env')

const res = (p) => path.resolve(__dirname, p)
const entryFile = res('../src/client/client.js')
const outputFolder = res('../tmp/client')
const outputFile = '[name].js'

const BUILT_ASSETS_FOLDER = '/'

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'inline-source-map',
  mode: 'development',
  entry: {
    main: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
      'react-hot-loader/patch',
      entryFile
    ]
  },
  output: {
    filename: outputFile,
    chunkFilename: outputFile,
    path: outputFolder,
    publicPath: BUILT_ASSETS_FOLDER
  },
  cache: false,
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
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
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
    new ExtractCssChunks(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new Dotenv({
      path: path.resolve(__dirname, '..', '.env'),
      safe: false
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(__dirname, '../src/client/sw.js'),
      excludes: ['*hot-update*', '**/*.map', '**/stats.json']
    })
  ],
  optimization: {
    runtimeChunk: {
      name: 'bootstrap'
    },
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
