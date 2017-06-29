const path = require('path')
const Webpack = require('webpack')
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')


module.exports = ({ filename, isProd }) => {
  const extractCSS = new ExtractTextPlugin(filename)

  const uglifyJS = new Webpack.optimize.UglifyJsPlugin({
    compress  : { warnings: true },
    output    : { comments: false },
    sourceMap : false
  })

  const styleLinter = StyleLintPlugin({
    configFile  : path.resolve(__dirname, '../stylelint.json'),
    files       : '**/*.less',
    emitErrors  : isProd
  })

  return isProd
    ? [ extractCSS, styleLinter, uglifyJS ]
    : [ extractCSS, styleLinter ]
}
