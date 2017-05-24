/**
 * store的抽象类,针对storage中的key,一般不使用该类,常用他的子类LocalStore(options.storage = window.localStorage)、SessionStore(options.storage = window.sessionStorage)
 *
 * @author hbmu
 * @date   2015/4/10
 *
 * @name   AbstractStore
 */
define(['../common', '../object.path'], function (c, objectPath) {
	"use strict";

	/**
	 * 根据liftTime 计算要增加的毫秒数
   *
	 * @param   {string} liftTime 单位D,H,M,S. eg. '24H'
	 * @return  {number} 根据liftTime计算要增加的毫秒数
	 */
	function getLifeTime(lifeTime) {
		var
			timeout,
			unit = lifeTime.charAt(lifeTime.length - 1),
			num = parseInt(lifeTime);

		unit = typeof unit === 'number' ? 'D' : unit.toUpperCase(); // 如果没有单位，给个默认值 ‘天’

		switch (unit) {
			case 'H': // 小时
				timeout = num * 60 * 60 * 1000;
				break;
			case 'M': // 分钟
				timeout = num * 60 * 1000;
				break;
			case 'S': // 秒
				timeout = num * 1000;
				break;
			default : // 默认为‘天’
				timeout = num * 24 * 60 * 60 * 1000;
		}

		return timeout;
	}

  /**
   * 构造函数
   *
   * @param {object} options
   *   - proxy           {AbstractStorage} AbstractStorage实例
   *   - key             {string} key
   *   - lifetime        {string} 生命周期,默认'1H' 单位D,H,M,S. eg. '24H'
   *   - rollbackEnabled {boolean} 是否回滚
   *
   * @name    AbstractStore
   * @grammar new AbstractStore(options)
   * @example
   * var store = new AbstractStore({
   *   proxy: new AbstractStorage({
   *     storage: window.localStorage
   *   }),
   *   key: 'USER'
   * })
   */
	var
		AbstractStore = c.baseClass(function (options) {
			this.options = c.extend({
        proxy: null,
				key: null,
				lifeTime: '1H',
				rollbackEnabled: false
			}, options);
		}, {
			/**
       * 设置this.key下的value
       *
			 * @param  {..} value
			 * @param  {string} 可选,tag标识,如果传递tag,get时会比较tag标识,不一致返回null
			 * @param  {string} 可选,默认false,是否设置回滚数据
			 * @return {boolean} 成功true,失败false
       *
       * @name    set
       * @grammar store.set(value[, tag][, isOld])
			 */
			set: function (value, tag, isOld) {
				if (!this.options.rollbackEnabled && isOld) throw 'param rollbackEnabled is false'; // 如果不允许roolback,则不能设置回滚数据
				var timeout = +new Date() + getLifeTime(this.options.lifeTime);
				return this.options.proxy.set(this.options.key, value, tag, timeout, isOld);
			},
			/**
       * 设置this.key下的value中name的value
       *
			 * @param  {String} name 支持通过路径的方式，如'a.b.c'
			 * @param  {..} value
			 * @param  {string} 可选,tag标识,如果传递tag,get时会比较tag标识,不一致返回null
			 * @param  {string} 可选,默认false,是否设置回滚数据
			 * @return {boolean} 成功true,失败false
       *
       * @name    setAttr
       * @grammar store.setAttr(name, value[, tag][, isOld])
			 */
			setAttr: function (name, value, tag, isOld) {
				if (!this.options.rollbackEnabled && isOld) throw 'param rollbackEnabled is false'; // 如果不允许roolback,则不能设置回滚数据

				var
					i, objValue;

				// name是object时,遍历name执行setAttr然后return
				if (typeof name === 'object') {
					for (i in name) {
						if (name.hasOwnProperty(i)) this.setAttr(i, name[i], tag, isOld);
					}
					return;
				}

				objValue = this.get(tag, isOld) || {};
				objectPath.set(objValue, name, value);

				return this.set(objValue, tag, isOld);
			},
			/**
       * 读取this.key下的value
       *
			 * @param  {string} 可选,tag标识,如果传递tag,get时会比较tag标识,不一致返回null
			 * @param  {string} 可选,默认false,是否设置回滚数据
			 * @return {..} value
       *
       * @name    get
       * @grammar store.get([tag][, isOld])
			 */
			get: function (tag, isOld) {
				return this.options.proxy.get(this.options.key, tag, isOld);
			},
			/**
       * 读取this.key下的value中name的value
       *
			 * @param  {String} name 支持通过路径的方式，如'a.b.c'
			 * @param  {string} 可选,tag标识,如果传递tag,get时会比较tag标识,不一致返回null
			 * @param  {string} 可选,默认false,是否设置回滚数据
			 * @return {..} value
       *
       * @name    getAttr
       * @grammar store.getAttr(name[, tag][, isOld])
			 */
			getAttr: function (name, tag, isOld) {
				return objectPath.get(this.get(tag, isOld), name);
			},
			/**
       * 获取tag
       *
       * @name    getTag
       * @grammar store.getTag()
			 */
			getTag: function () {
				return this.options.proxy.getTag(this.options.key);
			},
			/**
       * 移除存储对象
       *
       * @name    remove
       * @grammar store.remove()
			 */
			remove: function () {
				return this.options.proxy.remove(this.options.key);
			},
			/**
       * 设置失效时间
       *
       * @param  {number} timeout
       *
       * @name    setExpireTime
       * @grammar store.setExpireTime()
			 */
			setExpireTime: function (timeout) {
				return this.options.proxy.setExpireTime(this.options.key, timeout);
			},
			/**
       * 返回失效时间
       *
       * @name    getExpireTime
       * @grammar store.getExpireTime()
			 */
			getExpireTime: function () {
				return this.options.proxy.getExpireTime(this.options.key);
			},
			/**
       * 回滚至上个版本
       *
			 * @param  {string} 可选,默认false,回滚后是否清除回滚数据
			 * @return {boolean} 成功true,失败false
       *
       * @name    rollback
       * @grammar store.rollback([isClearOld])
			 */
			rollback: function (isClearOld) {
				var tag = this.getTag();
				if (this.options.rollbackEnabled) {
					if (this.set(this.get(null, true), tag)) { // 回滚成功
						isClearOld && this.set(null, tag, true);  // 需要清除oldVlue
						return true;
					}
				} else {
					throw 'param rollbackEnabled is false';
				}
			}
		})

	return AbstractStore;
});