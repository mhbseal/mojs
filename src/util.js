﻿/**
 * 工具方法集
 *
 * @author hbmu
 * @date   2014/10/20
 *
 * @name   utils
 * @example
 * define(['util'], function(util) {
 *   var str = 'mo';
 *   var num = 19871103;
 * })
 */
define(function () {
	"use strict";
	// 随机生成一个4位字符
	function S4() {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	}

	var utils = {
		/**
     * 生成guid
     *
     * @return {string} guid
     *
     * @name    guid
     * @grammar util.guid()
     * @example
     * util.guid() => 'd42fb5af-9b78-6320-9a79-327cb00ea561'
		 */
		guid: function() {
			return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
		},
		/**
     * 字符串的长度和index计算
     *
		 * @param  {string} 要计算的字符串
		 * @param  {number} 可选,字符串(双字节长度为2)的index
		 * @return {object} 返回对象
     *   - length {number} 字符串(双字节长度为2)的长度
		 *   - index  {number} 字符串的index,如果参数index为空,则该字段无返回值
     *
     * @name    getByteInfo
     * @grammar util.getByteInfo(str[, index])
     * @example
     * util.getByteInfo('我的生日是1987年11月03日', 5) => Object {length: 24, index: 2}
		 */
		getByteInfo: function(str, index) {
			var
				i = 0,
				len = str.length,
				ret = {
					length: 0
				};

			for (; i < len; i++) {
				if (str.charCodeAt(i) > 255) {
					ret.length += 2;
				}else {
					ret.length += 1;
				}
				if (index !== undefined && ret.index === undefined && ret.length > index) {
					ret.index = i;
				}
			}

			return ret;
		},
		/**
     * 字符串填充
     *
     * @param  {string} 需要处理的字符串,非字符串会先转换为字符串
		 * @param  {number} 填充的长度,如果需要处理的字符串大于此参数,则放弃
		 * @param  {string} 可选,填充字符,非字符串会先转换为字符串,默认为空格字符
		 * @param  {boolean} 可选,左边还是右边,默认为false,左边
		 * @param  {boolean} 可选,字符串的长度超过参数len是否截取,默认为false
		 * @return {string} 处理后的字符串
     *
     * @name    pad
     * @grammar util.pad(str, len[, fill][, right])
     * @example
     * util.pad(str, 4, '-') => '--mo'
     * util.pad(num, 14, 0, true) => '19871103000000'
     * util.pad(num, , 6, null, false, true) => '871103'
		 */
		pad: function(str, len, fill, right, trim) {
			str = str + '';

			if (!len || !trim && str.length >= len) return str;

			fill == null && (fill = '');

			fill = new Array(len + 1).join(fill);
			if (!right) {
				str = (fill + str).substr(-len);
			} else {
				str = (str + fill).substring(0, len);
			}

			return str;
		}
	};
	return utils;
});