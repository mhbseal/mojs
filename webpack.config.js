var
  webpack = require('webpack'),
  version = require('./package.json').version;

module.exports = {
  entry: './webpack.mo',
  output: {
    path: './dist',
    filename: 'mo-' + version + '.min.js',
    library: 'mo',
    libraryTarget: 'umd'
  },
  resolve: {
    root: './src',
    alias: {
      AbstractStorage: 'store/AbstractStorage',
      AbstractStore: 'store/AbstractStore',
      LocalStore: 'store/LocalStore',
      SessionStore: 'store/SessionStore',
      common: 'common',
      Cookie: 'Cookie',
      date: 'date',
      es5: 'es5.shim',
      IdCard: 'IdCard',
      objectPath: 'object.path',
      ParseUrl: 'parse.url',
      pubSub: 'pubSub',
      rules: 'rules',
      util: 'util'
    }
  },
  plugins: [
    new webpack.BannerPlugin(
      'mo.js v' + version + '\n' +
      'http://mhbseal.com/api/mojs.html\n' +
      '(c) 2014-' + new Date().getFullYear() + ' Mu Haibao'
    ),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};