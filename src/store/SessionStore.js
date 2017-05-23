/**
 * AbstractStore的子类
 *
 * @author hbmu
 * @date   2015/4/17
 *
 * @name   SessionStore
 * @example
 * var store = new SessionStore({
 *   key: 'USER'
 * })
 */
define(['../common', './AbstractStore', './AbstractStorage'], function (c, AbstractStore, AbstractStorage) {
	"use strict";

	var
		SessionStore = c.baseClass(function (options) {
      c.extend(this.options, options, {
        proxy: new AbstractStorage({
          storage: window.sessionStorage
        })
      })
		}, AbstractStore);

	return SessionStore;
});