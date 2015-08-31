﻿/**
 * 身份证的校验以及从从身份证号码中获取一些信息，例如出生日期，性别
 *
 * @author hbmu
 * @date   2014/10/21
 *
 * @name   IdCard
 * @example
 * define(['IdCard'], function(IdCard) { ... })
 *
 * @more  身份证规则
 * =====================================================================
 * 身份证15位编码规则 -- dddddd yymmdd xx p
 * dddddd : 地区码
 * yymmdd : 出生年月日
 * xx     : 顺序类编码，无法确定
 * p      : 性别，奇数为男，偶数为女
 *
 * 身份证18位编码规则 -- dddddd yyyymmdd xxx y
 * dddddd   : 地区码
 * yyyymmdd : 出生年月日
 * xxx      : 顺序类编码，无法确定，奇数为男，偶数为女
 * y        : 校验码，该位数值可通过前17位计算获得
 *
 * 18位号码加权因子为          : WI = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]
 * 校验位集合                  : CODE = [1, 0, 'x', 9, 8, 7, 6, 5, 4, 3, 2]
 * 校验位index计算公式         : index = mod(∑(ai×Wi), 11)
 * =====================================================================
 */
define(['common'], function (c) {
	"use strict";

	var
		WI = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1],
		CODE = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];

	/**
   * 构造函数
   *
	 * @param {string} 身份证号,这里必须是string格式,因为身份证号超出了js的整数精度范围
	 * @param {object} options,可选
	 *   - requireAreaInfo {boolean} 是否需要校验、获取省市区信息
   *
   * @name    IdCard
   * @grammar new IdCard(num, options)
   * @example
   * var idCard = new IdCard('610125198711037137', {requireAreaInfo: true});
   * // 要校验省市区或者获取省市区信息,需要异步引入一个较大的地区信息data(100K+),没有必要,建议不要设置requireAreaInfo!
	 */
	function IdCard(num, options) {
		this.options = c.extend({
			requireAreaInfo: false
		}, options);
		this.num = num;
	}

	/**
   * 验证校验位,针对18位
   *
	 * @return {boolean}
   *
   * @name checkCode
   * @example
   * idCard.checkCode() => true
	 */
	IdCard.prototype.checkCode = function() {
		var num = this.num;
		if (num.length === 18) {
			var
				sum = 0,
				i = 0;

			for(; i < 17; i++) {
				sum += WI[i] * num[i]
			};

			if (num[17].toUpperCase() !== String(CODE[sum % 11])) return false;
		}
		return true;
	};
	/**
   * 验证出生日期
   *
	 * @return {boolean}
   *
   * @name checkBirth
   * @example
   * idCard.checkBirth() => true
	 */
	IdCard.prototype.checkBirth = function() {
		var
			birth = this.getBirth(),
			date = new Date(birth.year, birth.month - 1, birth.day),
			newYear = date.getFullYear(),
			newMonth = date.getMonth() + 1,
			newDay = date.getDate(),
			now = new Date();
		if (birth.year !== newYear || birth.month !== newMonth || birth.day !== newDay || date > now) return false;
		return true;
	};
	/**
   * 获取出生日期
   *
	 * @return {object} 返回对象
	 *   - year  {number}
	 *   - month {number}
	 *   - day   {number}
   *
   * @name getBirth
   * @example
   * idCard.getBirth() => {year: 1987, month: 11, day: 13}
	 */
	IdCard.prototype.getBirth = function() {
		var num = this.num;
		if (num.length === 15) num = num.slice(0, 6) + "19" + num.slice(6, 16); // 修正15位的年月日
		return {
			year: +num.slice(6, 10),
			month: +num.slice(10, 12),
			day: +num.slice(12, 14)
		};
	};
	/**
   * 获取性别
   *
	 * @return {string}
   *
   * @name getSex
   * @example
   * idCard.getSex() => '男'
	 */
	IdCard.prototype.getSex = function() {
		var sex, num = this.num;
		if(num.length === 18) {
			sex = num.substr(-2, 1) % 2;
		}else {
			sex = num.substr(-1, 1) % 2;
		}
		return sex ? '男' : '女';
	};

	return IdCard;
});