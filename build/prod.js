const path    = require('path')
const context = path.resolve(__dirname, '..')
const output  = path.resolve(__dirname, '../../server/public')

const resolve = require('./common/resolve')
const modules  = require('./common/modules')
const plugins  = require('./common/plugins')

module.exports = {
  context: context,

  entry: ['./src/main.ts'],

  output: {
    path: output,
    filename: 'app.js'
  },

  resolve,

  module: modules({ isProd: true }),

  plugins: plugins({ filename: 'app.css', isProd: true }),

  devtool: false
}
