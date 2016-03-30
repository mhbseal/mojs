﻿/**
 * 操作cookie的方法
 *
 * @author hbmu
 * @date   2014/09/12
 *
 * @name   Cookie
 */
define(['./common', './es5.super'], function(c, es5) {
	"use strict";

	function encode(str, isRaw) {
		return isRaw ? str : encodeURIComponent(str);
	};
	function decode(str, isRaw) {
		return isRaw ? str : decodeURIComponent(str);
	};
	function stringifyCookie(obj, isJson) {
		return encode(isJson ? JSON.stringify(obj) : String(obj));
	};
	function parseCookie(str, isJson) {
		return isJson ? JSON.parse(decode(str)) : decode(str);
	};

	/**
   * 构造函数
   *
	 * @param {object} options
	 *   - isRaw {boolean} 是否原生字符（不转码）, 默认为false
	 *   - isJson {boolean} 是否str->json, 默认为false
   *
   * @name Cookie
   * @grammar new Cookie(options)
   * @example
   * var
   *   cookie = new Cookie(),
   *   cookie2 = new Cookie({isRaw: true, isJson: true});
	 */
	function Cookie(options) {
		this.options = c.extend({
			isRaw: false,
			isJson: false
		}, options);
	};

  /**
   * 设置cookie
   *
   * @param {string} name
   * @param {..} value
   * @param {obj} options
   *   - expires {number|string} 失效时长,单位 ‘天’, 默认为Session
   *   - path    {string} 路径,path只能设置当前path的子path, 默认为当前path
   *   - domain  {string} 域,domain只能设置当前domain的子domain, 默认为当前domain
   *   - secure  {boolean} 安全策略,只有https下能设置 ture or false, 默认为false
   *
   * @name    set
   * @grammar cookie.set(name, value[, options])
   * @example
   * cookie.set('user', 'mo');
   * cookie2.set('user2', {a: 'mojs', b: 'modoc'}, {expires: 1});
   */
  Cookie.prototype.set = function(name, value, options) {
    var
      options = options || {},
      expires = new Date();

    if(options.expires) expires.setTime(+expires + +options.expires * 864e+5);

    document.cookie = [
      encode(name, this.options.isRaw), '=', stringifyCookie(value, this.options.isJson),
      options.expires ? '; expires=' + expires : '', // use expires attribute, max-age is not supported by IE
      options.path    ? '; path=' + options.path : '',
      options.domain  ? '; domain=' + options.domain : '',
      options.secure  ? '; secure' : ''
    ].join('');
  };

	/**
   * 读取cookie
   *
	 * @param  {string} cookie的name
	 * @return {..} cookie的value
   *
   * @name    get
   * @grammar cookie.get(name)
   * @example
   * cookie.get('user') => 'mo'
   * cookie2.get('user2') => {a: 'mojs', b: 'modoc'}
	 */
	Cookie.prototype.get = function(name) {
		var
			cookieStr = document.cookie,
			cookies = cookieStr ? cookieStr.split('; ') : [],
			result = ''; // safari下remove cookie只会把值设为空

		es5.each(cookies, function(cookie) {
			var
				parts = cookie.split('='),
				key = decode(parts[0], this.options.isRaw);

			if (name === key) {
				result = parseCookie(parts[1], this.options.isJson);
				return false;
			}
		}, this)

		return result;
	};

	/**
   * 删除cookie
   *
	 * @param {string} cookie的name
   *
   * @name    remove
   * @grammar cookie.remove(name)
   * @example
   * cookie.remove('user')
	 */
	Cookie.prototype.remove = function(name) {
		this.set(name, '', {expires: -1});
	};

	return Cookie;
});