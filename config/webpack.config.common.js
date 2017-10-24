var webpack = require('webpack')
var merge = require('webpack-merge')
var base = require('./webpack.config.base')
var path = require('path')

var outputFile = 'vue-elasticsearch'
var globalName = 'VueElasticsearch'

module.exports = merge(base, {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: outputFile + '.common.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  externals: {
    'elasticsearch': 'elasticsearch',
    'lodash': 'lodash',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
      mangle: false,
    }),
  ],
})
