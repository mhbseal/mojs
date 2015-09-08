﻿/**
 * 常用的正则校验规则
 *
 * @author hbmu
 * @date   2014/11/20
 *
 * @name   rules
 * @example
 * // 校验，返回值为true/false
 * rules.isRequired('校验文本') // 必填
 * rules.isChinese(..) // 中文
 * rules.isDoubleByte(..) // 双字节
 * rules.isZipcode(..) // 邮政编码
 * rules.isQq(..) // QQ
 * rules.isPicture(..) // 图片
 * rules.isRar(..) // 压缩文件
 * rules.isMobile(..) // 手机号
 * rules.isMoney(..) // 金额（不能包含分隔符）
 * rules.isEnglish(..) // 英文字母
 * rules.isLowerCase(..) // 英文小写
 * rules.isUpperCase(..) // 英文大写
 * rules.isNumber(..) // 纯数字
 * rules.isInteger(..) // 整数
 * rules.isFloat(..) // 浮点数
 * rules.isRealName(..) // 姓名（中英文）
 * rules.isEmail(..) // 邮箱
 * rules.isUrl(..) // 网址 http://mhbsesal.com
 * rules.isIdCard(..) // 身份证
 * rules.isPhone(..) // 座机（区号-主号-分机号）029-8784326-11316
 * rules.isAreaNum(..) // 座机-区号
 * rules.isHostNum(..) // 座机-主号
 * rules.isExtensionNum(..) // 座机-分机号
 * rules.isIp(..) // IP地址
 */
define(function () {
	"use strict";

	var rules = {
		isRequired: function(val) { return val !== '' },
		isChinese: function(val) { return /^[\u4e00-\u9fa5]+$/.test(val) },
		isDoubleByte: function(val) { return /[^\x00-\xff]/.test(val) },
		isZipcode: function(val) { return /^\d{6}$/.test(val) },
		isQq: function(val) { return /^[1-9]\d{4,9}$/.test(val) },
		isPicture: function(val) { return /\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/.test(val) },
		isRar: function(val) { return /\.(rar|zip|7zip|tgz|)$/.test(val) },
		isMobile: function(val) { return /^1[34578]\d{9}$/.test(val) },
		isMoney: function(val) { return /^([1-9]\d*(\.\d{1,2})?|0\.\d{1,2})$/.test(val) },
		isEnglish: function(val) { return /^[A-Za-z]+$/.test(val) },
		isLowerCase: function(val) { return /^[a-z]+$/.test(val) },
		isUpperCase: function(val) { return /^[A-Z]+$/.test(val) },
		isNumber: function(val) { return /^\d+$/.test(val) },
		isInteger: function(val) { return /^-?[1-9]\d*$/.test(val) },
		isFloat: function(val) { return /^-?([1-9]\d*|0)\.\d+$/.test(val) },
		isRealName: function(val) { return /^[a-zA-Z\u4e00-\u9fa5]+$/.test(val) },
		isEmail: function(val) { return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(val) },
		isUrl: function(val) { return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(val) },
		isIdCard: function(val) { return /^(\d{15}|\d{17}[0-9a-zA-Z])$/.test(val) },
		isPhone: function(val) { return /^(\d{3,4}-)\d{7,8}(-\d{1,6})?$/.test(val) },
		isAreaNum: function(val) { return /^\d{3,4}$/.test(val) },
		isHostNum: function(val) { return /^\d{7,8}$/.test(val) },
		isExtensionNum: function(val) { return /^\d{1,6}$/.test(val) },
		isIp: function(val) { return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(val) }
	};

	return rules;
});