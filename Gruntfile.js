module.exports = function (grunt) {

	var pkg = grunt.file.readJSON('package.json');

	// 配置 grunt配置API见 http://gruntjs.com/api/grunt
  grunt.initConfig({
	  requirejs: { // requirejs配置API见 https://github.com/jrburke/r.js/blob/master/build/example.build.js
		  options: {
			  baseUrl: './src/',
			  paths: {
				  common: 'core/common',
				  es5: 'core/es5.shim',
				  objectPath: 'core/object.path',
				  ParseUrl: 'core/ParseUrl',
				  date: 'core/date',
				  util: 'core/util',
				  IdCard: 'core/IdCard',
				  Cookie: 'core/Cookie',
				  rules: 'core/rules',
				  pubSub: 'core/pubSub',
				  AbstractStorage: 'core/store/AbstractStorage',
				  AbstractStore: 'core/store/AbstractStore',
				  LocalStore: 'core/store/LocalStore',
				  SessionStore: 'core/store/SessionStore'
			  },
			  outUrl: './dest/'
		  },
		  mojs: {
			  options: {
				  include: [
					  'common',
					  'es5',
					  'objectPath',
					  'ParseUrl',
					  'date',
					  'util',
					  'IdCard',
					  'Cookie',
					  'rules',
					  'pubSub',
					  'AbstractStorage',
					  'AbstractStore',
					  'LocalStore',
					  'SessionStore'
				  ],
				  out: '<%= requirejs.options.outUrl  %>mo-' + pkg.version + '.js'
			  }
		  }
	  }
  });

	// 载入插件
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	// 注册任务
	grunt.registerTask('mojs', ['requirejs']);
	
};