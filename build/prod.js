var webpack = require('webpack')
var webpackConfig = require('../webpack.prod.js')

webpack(webpackConfig, function (err, stats) {
  if (err) throw err

  console.log('Build complete')
})