const path = require('path')

module.exports = {
  extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.less'],
  modules: [
    path.resolve(__dirname, '../../src'),
    path.resolve(__dirname, '../../node_modules')
  ]
}
