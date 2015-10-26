﻿/**
 * es5 shim test
 */
define(['es5'], function (es5) {
	"use strict";

  describe('es5 shim', function () {
    var obj, arr, arr2, arrlike, arrlike2, ret, ret2;

    obj = {
      a: 0,
      b: 1,
      c: 2
    };
    arr = ['a', 'b', 'c'];
    arr2 = [1, 2, 3];
    arrlike = {
      0: 'a',
      1: 'b',
      2: 'c',
      length: 3
    };
    arrlike2 = {
      0: 1,
      1: 2,
      2: 3,
      length: 3
    };
    ret = {};

    function iterator(v, k) {
      ret[k] = v;
    };

    function iterator2(v, k) {
      return k + ': ' + v
    };

    function iterator3(v, k) {
      if (v > 1 || k > 1) return true;
    };

    function iterator4(v, k) {
      if (v > 1) return true;
    };

    function iterator5(v1, v2, i) {
      return v1 - v2;
    };

    it('each', function () {
      es5.each(obj, iterator);
      expect(ret).toEqual({ a: 0, b: 1, c: 2 });
      ret = {};
      es5.each(arr, iterator);
      expect(ret).toEqual({ 0: 'a', 1: 'b', 2: 'c' });
      ret = {};
      es5.each(arrlike, iterator);
      expect(ret).toEqual({ 0: 'a', 1: 'b', 2: 'c' });
      ret = {};
    })

    it('map', function () {
      expect(es5.map(obj, iterator2)).toEqual([ 'a: 0', 'b: 1', 'c: 2' ]);
      expect(es5.map(arr, iterator2)).toEqual([ '0: a', '1: b', '2: c' ]);
      expect(es5.map(arrlike, iterator2)).toEqual([ '0: a', '1: b', '2: c' ]);
    })

    it('filter', function () {
      expect(es5.filter(obj, iterator3)).toEqual([2]);
      expect(es5.filter(arr, iterator3)).toEqual(['c']);
      expect(es5.filter(arrlike, iterator3)).toEqual(['c']);
    })

    it('some', function () {
      expect(es5.some(obj, iterator4)).toBeTruthy();
      expect(es5.some(arr, iterator4)).toBeFalsy();
      expect(es5.some(arrlike, iterator4)).toBeFalsy();
    })

    it('every', function () {
      expect(es5.every(obj, iterator4)).toBeFalsy();
      expect(es5.every(arr, iterator4)).toBeFalsy();
      expect(es5.every(arrlike, iterator4)).toBeFalsy();
    })

    it('indexOf', function () {
      expect(es5.indexOf(arr, 'b')).toEqual(1);
      expect(es5.indexOf(arrlike, 'b', 2)).toEqual(-1);
    })

    it('lastIndexOf', function () {
      expect(es5.lastIndexOf(arr, 'b')).toEqual(1);
      expect(es5.lastIndexOf(arrlike, 'b', 0)).toEqual(-1);
    })

    it('bind', function () {
      (es5.bind(function(c, d) {this.a = 1; this.c = c; this.d = d}, ret, 3))(4);
      expect(ret).toEqual({ a: 1, c: 3, d: 4 });
      ret = {};

      ret2 = new (es5.bind(function(c, d) {this.a = 1; this.c = c; this.d = d}, ret, 3))(4);
      expect(ret).toEqual({});
      expect(JSON.stringify(ret2)).toEqual(JSON.stringify({ a: 1, c: 3, d: 4 }));
      ret2 = {};

      ret2 = new (es5.bind(function(c, d) {this.a = 1; this.c = c; this.d = d; return {e: 5}}, ret, 3))(4);
      expect(ret).toEqual({});
      expect(ret2).toEqual({ e: 5 });
      ret2 = {};
    })

    it('reduce', function () {
      expect(es5.reduce(arr2, iterator5)).toEqual(-4);
      expect(es5.reduce(arrlike2, iterator5, 10)).toEqual(4);
    })

    it('reduceRight', function () {
      expect(es5.reduceRight(arr2, iterator5)).toEqual(0);
      expect(es5.reduceRight(arrlike2, iterator5, 10)).toEqual(4);
    })
  })
});