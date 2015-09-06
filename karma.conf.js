module.exports = function(config) {
  config.set({
    basePath: './test',
    frameworks: ['jasmine'],
    files: [
      '*.spec.js',
      '**/*.spec.js'
    ],
    preprocessors: {
      '*.spec.js': ['webpack'],
      '**/*.spec.js': ['webpack']
    },
    webpack: {
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
      }
    },
    webpackMiddleware: { // 这个干吗的？
      noInfo: true
    },
    reporters: ['progress'], // 这个干吗的？
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Firefox', 'Safari', 'IE'],
    singleRun: false, // 这个干吗的？
    plugins: [
      require("karma-webpack"),
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-firefox-launcher"),
      require("karma-safari-launcher"),
      require("karma-ie-launcher")
    ]
  })
}
