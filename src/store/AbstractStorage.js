/**
 * storage的抽象类,主要存储的时候多些例如：tag、timeout、oldValue等字段，来强化storage.
 *
 * @author hbmu
 * @date   2015/4/9
 */
define(['common'], function (c) {
	"use strict";

	/**
	 * 保存缓存的失效时间
   *
	 * @param {storage} 缓存代理
	 * @param {string} 保存所有缓存的失效时间map的缓存的key
	 * @param {string} 要保存失效时间的key
	 * @param {number} 失效时间
	 */
	function saveCacheTime(storage, timeMapKey, key, timeout) {
		var
			timeMapStr = storage.getItem(timeMapKey),
			timeMap = JSON.parse(timeMapStr) || [],
			isNewObj = true,
			i = 0,
			obj = {
				key: key,
				timeout: timeout
			};

		// 循环keys，如果有key则更新timeMap对应的key
		for (; i < timeMap.length; i++) {
			if (timeMap[i].key === key) {
				timeMap[i] = obj;
				isNewObj = false;
			}
		}

		isNewObj && timeMap.push(obj); // 如果是新的key，则push到timeMap中

		storage.setItem(timeMapKey, JSON.stringify(timeMap));
	}

	/**
	 * 在设置storage时超出容量时，删除离过期时间最近的缓存
   *
	 * @param {storage} 缓存代理
	 * @param {string} 保存所有缓存的失效时间map的缓存的key
	 * @param {number} 删除的缓存的个数，默认5
	 */
	function removeOldestCache(storage, timeMapKey, num) {
		var
			i = 0,
			timeMapStr, timeMap, deletedKey, len;

		if (timeMapStr = storage.getItem(timeMapKey)) { // 存在timeMapKey的情况
			timeMap = JSON.parse(timeMapStr);
			if (num == null) num = 5; // 默认删除5个

			// 排序，排序比较耗时
			timeMap.sort(function (a, b) {
				return a.timeout - b.timeout
			});

			// 删除N个缓存
			deletedKey = timeMap.splice(0, num);
			for (len = deletedKey.length; i < num; i++) {
				storage.removeItem(deletedKey[i].key);
			}

			// 将剩余的key存入缓存中，没有则删除timeMap这个key
			timeMap.length ? storage.setItem(timeMapKey, JSON.stringify(timeMap)) : storage.removeItem(timeMapKey);
		} else { // 不存在timeMapKey的情况，则清除整个storage
			storage.clear();
		}
	}

	/**
	 * 构造最终存入对应key的value值
   *
	 * @param  {string} value
	 * @param  {string} tag
	 * @param  {string} timeout
	 * @param  {string} 设置的是否是回滚数据
	 * @return {object} 包含2个param的对象
	 */
	function buildStorageObj(value, oldValue, tag, timeout) {
		var result = {
			timeout: timeout
		};
		if(value != null) result.value = value;
		if(oldValue != null)	result.oldValue = oldValue;
		if(tag != null) result.tag = tag;
		return result;
	}

	var
		AbstractStorage = c.baseClass(function (options) {
			this.options = c.extend({
				storage: null,
				timeMapKey: 'CACHE_TIME_MAP'
			}, options)
		}, {
			/**
			 * 设置数据
       *
			 * @param  {string} key
			 * @param  {*} value
			 * @param  {string} 可选,tag标识,如果传递tag,get时会比较tag标识,不一致返回null
			 * @param  {number} 可选,失效时间,默认 now+1天
			 * @param  {string} 可选,默认false,是否设置回滚数据
			 * @return {boolean} 成功true,失败false
			 */
			set: function (key, value, tag, timeout, isOld) {
				// 参数校正
				var
					now = +new Date(),
					storage = this.options.storage,
					otherValue, oldValue;

				if (timeout == null || timeout < now) timeout = now + 24 * 60 * 60 * 1000; // 默认 now+1天
				if (this.getTag(key) === tag) otherValue = this.get(key, tag, !isOld);

				if (isOld) { // 设置回滚数据
					oldValue = value;
					value = otherValue;
				} else {
					oldValue = otherValue;
				};

				try {
					storage.setItem(key, JSON.stringify(buildStorageObj(value, oldValue, tag, timeout)));
					saveCacheTime(storage, this.options.timeMapKey, key, timeout); // 保存缓存的失效时间
					return true;
				} catch (e) {
					if (e.name === 'QuotaExceededError') {
						// localstorage写满时，选择离过期时间最近的数据删除，但是如果缓存过多，此过程相对来说比较耗时，也可以选择写满时清除全部
						removeOldestCache(storage, this.options.timeMapKey);
						this.set(key, value, tag, timeout, isOld);
					}
					return false;
				}
			},
			/**
			 * 读取数据
       *
			 * @param  {string} key
			 * @param  {string} tag标识,如果传递tag,get时会比较tag标识,不一致返回null
			 * @param  {boolean} 可选,默认false,是否读取回滚数据
			 * @return {*} 读取保存的数据
			 */
			get: function (key, tag, isOld) {
				var
					obj = this.options.storage.getItem(key),
					value = null;

				if (obj) {
					obj = JSON.parse(obj);
					if (obj.timeout >= +new Date()) {
						if (tag == null || tag && tag === obj.tag) {
							value = isOld ? obj.oldValue : obj.value;
						}
					}
				}

				return value;
			},
			/**
			 * 返回key的tag
       *
			 * @param  {string} key
			 * @return {string} tag
			 */
			getTag: function (key) {
				var obj = this.options.storage.getItem(key);
				return obj ? JSON.parse(obj).tag : null;
			},
			/**
			 * 设置key的失效时间
       *
			 * @param  {string} key
			 * @return {boolean} 成功true,失败false
			 */
			setExpireTime: function (key, timeout) {
				var obj = this.options.storage.getItem(key);
				if (obj) {
					obj = JSON.parse(obj);
					if (timeout < obj.timeout) return;
					return this.set(key, value, tag, timeout);
				}
				return false;
			},
			/**
			 * 读取key的失效时间
       *
			 * @param  {string} key
			 * @return {number} timeout
			 */
			getExpireTime: function (key) {
				var obj = this.options.storage.getItem(key);
				return obj ? JSON.parse(obj).timeout : null;
			},
			/**
			 * 清除指定key
       *
			 * @param {string} key
			 */
			remove: function (key) {
				return this.options.storage.removeItem(key);
			},
			/**
			 * 清空所有storage内容
			 */
			clear: function () {
				return this.options.storage.clear();
			},
			/**
			 * 垃圾回收,清除掉过期数据和空数据(只处理通过AbstracStorage存储过的)
			 */
			gc: function () {
				var
					timeMapKey = this.options.timeMapKey,
					storage = this.options.storage,
					timeMapStr, timeMap, i = 0, len, key, value, TimeMapResult = [];

				if (timeMapStr = storage.getItem(timeMapKey)) {
					timeMap = JSON.parse(timeMapStr);
					len = timeMap.length;
					for (; i < len; i++) {
						value = timeMap[i];
						key = value.key;
						if (key !== 'GUID' && !this.get(key) && !this.get(key, null, true)) {
							this.remove(key);
						} else {
							TimeMapResult.push(value);
						}
						;
					}
					// 将剩余的key存入缓存中，没有则删除timeMap这个key
					TimeMapResult.length ? storage.setItem(timeMapKey, JSON.stringify(TimeMapResult)) : storage.removeItem(timeMapKey);
				}
			}
		})

	return AbstractStorage;
});