var pkg = require('./package.json');

module.exports = {
  name: 'mojs',
  version: pkg.version,
  repositoryUrl: pkg.homepage,
  introduction: 'mojs，一个javascript常用方法库，包含了浏览器中对storage、cookie的操作封装，e5 super，date日期处理，身份证、url中元素校验解析，及一些其他常用的方法集合（正则、extend、继承、类等...）。<br /><br />源码采用AMD书写，以webpack打包，karma+jasmine单元测试，UMD格式输出，如果以全局方式引入，方法集全挂在全局变量mo下，例如访问util方法集则已mo.util访问。<br /><br /><a href="/fe/static/scripts/mo.min.js" target="_blank">生产版本（' + pkg.version + '）</a><br /><a href=\"/fe/static/scripts/mo.js\" target="_blank">开发版本（' + pkg.version + '）</a>',
  paths: {
    input: "./src",
    output: "./doc"
  },
  source: './dist/mo.min.js',
  skip: ["store/AbstractStorage.js"]
}