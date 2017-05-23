/**
 * 日期格式化、计算
 *
 * @author hbmu
 * @date   2015/1/29
 *
 * @name   date
 * @example
 * var
 *   birthday = new Date(), // 默认值,当前客户端时间Date实例
 *   birthday2 = '/Date(562941040500+0800)/', // 非JS格式的时间戳,例如.NET
 *   birthday3 = '1987/11/03 20:30:40', // 需要重新格式化的字符串,注意12小时制不支持
 *   birthday4 = '1987/11/03', // 需要重新格式化的字符串
 *   birthday5 = 562941040500, // 时间戳(number/string)
 *   birthday6 = new Date('1987', '10', '03', '20', '30', '40', '500'); // Date实例
 */
define(['./util'], function (util) {
	"use strict";
	// 解析date,大部分
	function dateGetter(name, size, offset, trim) {
		offset = offset || 0;
		return function() {
			var value = this['get' + name]();

			// 这里是为了处理12小时制和month的+1
			if (offset > 0 || value > -offset) value += offset;
			if (value === 0 && offset == -12) value = 12;

			return util.pad(value, size, 0, false, trim);
		};
	};
	// 解析date,星期X
	function dayGetter(index) {
		return function() {
			var value = this.getDay();
			return dateFormats.day[index].split(',')[value];
		}
	};
	// 解析date,上下午
	function ampmGetter(index) {
		return function() {
			var ampm = dateFormats.ampm[index].split(',');
			return this.getHours() < 12 ? ampm[0] : ampm[1];
		}
	};
	// 解析date,季度
	function quarterGetter() {
		return Math.ceil((this.getMonth() + 1) / 3);
	};
	// 解析date,一年中的第几天
	function dayOfyearGetter(size) {
		return function() {
			var
				monthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
				year = this.getFullYear(),
				month = this.getMonth(),
				day = this.getDate(),
				result = 0,
				i = 0;

			for (; i < month; i++) {
				result += monthArray[i];
			}
			result += day;

			//判断是否闰年
			if (month > 1 && (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
				result += 1;
			}

			return util.pad(result, size, 0);
		}
	};
	// 解析date,获取第几周
	function weekGetter(index, size) { // index(0-6, 0为星期天, 把周几当做一周的第一天)
		return function() {
			var
				firstDayOfFirstWeekOfYear = getFirstDayOfFirstWeekOfYear(this, index),
				firstDayOfThisWeek = getFirstDayOfThisWeek(this, index),
				diff = +firstDayOfThisWeek - +firstDayOfFirstWeekOfYear,
				result = 1 + Math.round(diff / 6.048e8); // 6.048e8 ms per week

			return util.pad(result, size, 0);
		};
	};
	// 获取date所在年份,周的第一天
	function getFirstDayOfFirstWeekOfYear(date, index) {
		var
			year = date.getFullYear(),
			dayOfWeekOnFirst = (new Date(year, 0, 1)).getDay(),
			diff = index - dayOfWeekOnFirst;

		if (diff > 0) diff -= 7;

		return new Date(year, 0, (1 + diff));
	};
	// 获取date所在周,周的第一天
	function getFirstDayOfThisWeek(date, index) { // index 同上
		var diff = index - date.getDay();

		if (diff > 0) diff -= 7;

		return new Date(date.getFullYear(), date.getMonth(), date.getDate() + diff);
	};
	// 处理参数date
	function dateHandler(date) {
		var
      dArray, // 数组化后的日期
      ret;

		if (typeof date === 'string') { // 如果date参数是string类型
			if (rNumberstring.test(date)) { // 如果date参数是number string类型
        ret = new Date(date);
			} else { // 这里重新格式化,一般都是从服务端过来的数据,必须有年月日,并且顺序是年月日时分秒毫秒,并且7个值之间有间隔符,间隔符为\D
				dArray = date.match(rDatestring); // 从string中提取new Date需要的参数
				if(dArray.length < 3) { // 服务端时间戳,例如NET "/Date(562941040500+0800)/"
          ret = new Date(+dArray[0]);
				} else { // 格式化过的
          ret = new Date(dArray[0], dArray[1] - 1, dArray[2] || 1, dArray[3] || 0, dArray[4] || 0, dArray[5] || 0, dArray[6] || 0);
				}
			}
		} else if (typeof date === 'number' || Object.prototype.toString.call(date) === '[object Date]') { // 如果date参数是number类型、date类型
      ret = new Date(+date);
		} else if (date == null) { // 如果不存在date参数
      ret = new Date();
		} else {
      return false;
    }

		return ret;
	}

	var rDatestring = /\d+/g;
	var rNumberstring = /^\d+$/;
	var dateFormats = {
		ampm: [
			'AM,PM',
			'am,am',
			'上午,下午'
		],
		day: [
			'周日,周一,周二,周三,周四,周五,周六',
			'星期日,星期一,星期二,星期三,星期四,星期五,星期六'
		]
	};

	// token 正则和格式化函数
	var rToken = /(\\?)([MQDdwYAaHhmsS]+)/g;
	var formatTokenFunctions = {
		M: dateGetter('Month', null, 1),
		MM: dateGetter('Month', 2, 1),
		Q: quarterGetter,
		D: dateGetter('Date'),
		DD: dateGetter('Date', 2),
		DDD: dayOfyearGetter(),
		DDDD: dayOfyearGetter(3),
		d: dateGetter('Day'),
		ddd: dayGetter(0),
		dddd: dayGetter(1),
		YY: dateGetter('FullYear', 2, null, true),
		YYYY: dateGetter('FullYear'),
		w: weekGetter(0),
		ww: weekGetter(0, 2),
		A: ampmGetter(0),
		a: ampmGetter(1),
		aa: ampmGetter(2),
		H: dateGetter('Hours'),
		HH: dateGetter('Hours', 2),
		h: dateGetter('Hours', null, -12),
		hh: dateGetter('Hours', 2, -12),
		m: dateGetter('Minutes'),
		mm: dateGetter('Minutes', 2),
		s: dateGetter('Seconds'),
		ss: dateGetter('Seconds', 2),
		S: dateGetter('Milliseconds'),
		SS: dateGetter('Milliseconds', 2),
		SSS: dateGetter('Milliseconds', 3)
	};

	var date = {
    /**
     * 获取非Date类型
     *
     * @param  {number|string|date} 非Date类型的date
     * @return {Date} Date
     *
     * @name    get
     * @grammar date.get(date)
     * @example
     * date.get('1987/11/03 21:30:40') => Tue Nov 03 1987 21:30:40 GMT+0800 (CST)
     */
    get: function(date) {
      return dateHandler(date);
    },
		/**
     * 格式化日期
     *
		 * @param  {number/string/date} 需要格式化的date
		 * @param  {string} token字符串
		 * @return {string} 格式化后的字符串
     *
     * @name    format
     * @grammar date.format([date,] format)
     * @example
     * date.format(birthday6, 'YYYY-MM-DD HH:mm:ss:SSS') => '1987-11-03 20:30:40:500'
     * date.format(birthday6, 'YY年M月D日 h时m分s秒 S毫秒 ddd') => '87年11月3日 8时30分40秒 500毫秒 周二'
     * date.format(birthday6, '\\Q\\ww\\a,第Q季度,第ww周季度,A') => 'Qwwa,第4季度,第45周季度,PM'
     *
     * @more token映射表 参照 http://momentjs.com/docs/#/displaying/,只引用了其中一部分,涉及到中文的部分稍微有调整
     * ==================================================================
     *                          Token       Output
     * Month                    M           1 2 ... 11 12
     *                          MM          01 02 ... 11 12
     * Quarter                  Q           1 2 3 4
     * Day of Month             D           1 2 ... 30 31
     *                          DD          01 02 ... 30 31
     * Day of Year              DDD         1 2 ... 364 365
     *                          DDDD        001 002 ... 364 365
     * Day of Week              d           0 1 ... 5 6
     *                          ddd         周日 周一 ... 周五 周六
     *                          dddd        星期日 星期一 ... 星期五 星晴六
     * Week of Year             w           1 2 ... 52 53
     *                          ww          01 02 ... 52 53
     * Year                     YY          70 71 ... 29 30
     *                          YYYY        1970 1971 ... 2029 2030
     * AM/PM                    A           AM PM
     *                          a           am pm
     *                          aa          上午 下午
     * Hour                     H           0 1 ... 22 23
     *                          HH          00 01 ... 22 23
     *                          h           1 2 ... 11 12
     *                          hh          01 02 ... 11 12
     * Minute                   m           0 1 ... 58 59
     *                          mm          00 01 ... 58 59
     * Second                   s           0 1 ... 58 59
     *                          ss          00 01 ... 58 59
     * Fractional Second        S           0 1 ... 8 9
     *                          SS          0 1 ... 98 99
     *                          SSS         0 1 ... 998 999
     * ==================================================================
		 */
		format: function(date, format) {
			if (arguments.length === 1) { // 修正参数
				format = date;
				date = null;
			}

			if(!(date = dateHandler(date))) return;

			return format.replace(rToken, function(match, escape, token) {
				if (escape) { // 如果是转义的则忽略，例如'\\Y'
					return token;
				}else {
					return formatTokenFunctions[token].call(date);
				}
			})
		}
	};

	/**
   * 日期加减计算
   *
   * @param  {number|string|date} 需要格式化的date,不传默认为当前时间
	 * @param  {string} 单位['FullYear', 'Month', 'Date', 'Hours', 'Minutes', 'Seconds', 'Milliseconds', 'Time']
	 * @param  {number} n单位
	 * @return {Date} 计算后的结果
   *
   * @name    add/sub
   * @grammar date.add([date,] name, number)/date.sub([date,] name, number)
   * @example
   * date.add(birthday6, 'Hours', 1) => Tue Nov 03 1987 21:30:40 GMT+0800 (CST)
   * date.sub(birthday6, 'Minutes', 1) => Tue Nov 03 1987 20:29:40 GMT+0800 (CST)
	 */
	var computeFactory = function(method) {
		date[method] = function(date, name, num) {
			if (arguments.length === 2) { // 修正参数
				num = name;
				name = date;
				date = null;
			}
			date = dateHandler(date);
			method === 'sub' && (num = -num);
			date['set'+ name](date['get'+ name]() + num);
			return date;
		}
	};
	computeFactory('add');
	computeFactory('sub');

	return date;
});