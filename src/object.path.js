﻿/**
 * 读取或设置object path下的value
 *
 * @author hbmu
 * @date   2014/4/13
 *
 * @name   objectPath
 * @example
 * var obj = { f: { g: 'blog' } };
 */
define(function () {
	"use strict";

	var objectPath = {
		/**
     * 设置object path下的value
     *
		 * @param  {object} obj
		 * @param  {string} path
		 * @param  {*} value
		 * @return {boolean} 成功true,失败false
     *
     * @name    set
     * @grammar objectPath.set(obj, path, value)
     * @example
     * objectPath.set(obj, 'a.d', 'mojs') => obj.a.d = 'mojs'
     * objectPath.set(obj, 'a.b.e', 'modoc') => obj.a.b.e = 'modoc'
		 */
		set: function (obj, path, value) {
			if (!obj || !path) return false;

			var
				pathArr = path.split('.'),
				i = 0,
				len = pathArr.length;

			while(i < len - 1) { // 遍历
				var key = pathArr[i];
				if(obj[key] == null) obj[key] = {};
				if(typeof obj[key] !== 'object') return false; // 如果遍历到的value不是object、undefined、null则放弃操作
				obj = obj[key];
				i++;
			}

			if (value != null) {
				obj[pathArr[i]] = value;
			} else {
				delete obj[pathArr[i]];
			}

			return true;
		},
		/**
     * 读取object path下的value
     *
		 * @param  {object} obj
		 * @param  {string} path
		 * @return {*} value
     *
     * @name    get
     * @grammar objectPath.set(obj, path)
     * @example
     * objectPath.get(obj, 'f.g') => 'blog'
     * objectPath.get(obj, 'a.b.e') => 'mojs'
		 */
		get: function (obj, path) {
			if (!obj || !path) return null;

			var
				pathArr = path.split('.'),
				i = 0,
				len = pathArr.length;

			while(i < len) { // 遍历 .
				if ((obj = obj[pathArr[i++]]) == null) return null;
			}

			return obj;
		}
	}

	return objectPath;
});