/**
 * rules test
 */
define(['rules'], function (rules) {
	"use strict";

  describe('rules', function () {
    it('isRequired', function () {
      expect(rules.isRequired('非空，即为必需！')).toBeTruthy();
    })
    it('isChinese', function () {
      expect(rules.isChinese('我是中国人')).toBeTruthy();
    })
    it('isDoubleByte', function () {
      expect(rules.isDoubleByte('我是中国人，对没错！')).toBeTruthy();
    })
    it('isZipcode', function () {
      expect(rules.isZipcode('710302')).toBeTruthy();
    })
    it('isQq', function () {
      expect(rules.isQq('369441319')).toBeTruthy();
    })
    it('isRar', function () {
      expect(rules.isRar('abc.rar')).toBeTruthy();
    })
    it('isMobile', function () {
      expect(rules.isMobile(15618526020)).toBeTruthy();
    })
    it('isMoney', function () {
      expect(rules.isMoney(1000.00)).toBeTruthy();
    })
    it('isEnglish', function () {
      expect(rules.isEnglish('mhbsesal')).toBeTruthy();
    })
    it('isLowerCase', function () {
      expect(rules.isLowerCase('abc')).toBeTruthy();
    })
    it('isUpperCase', function () {
      expect(rules.isUpperCase('ABC')).toBeTruthy();
    })
    it('isNumber', function () {
      expect(rules.isNumber(1000.000)).toBeTruthy();
    })
    it('isInteger', function () {
      expect(rules.isInteger(1000)).toBeTruthy();
    })
    it('isFloat', function () {
      expect(rules.isFloat(1000.00)).toBeTruthy();
    })
    it('isRealName', function () {
      expect(rules.isRealName('中国人')).toBeTruthy();
    })
    it('isEmail', function () {
      expect(rules.isEmail('mhbseal@163.com')).toBeTruthy();
    })
    it('isUrl', function () {
      expect(rules.isUrl('http://mhbseal.com')).toBeTruthy();
    })
    it('isIdCard', function () {
      expect(rules.isIdCard(610125198711037137)).toBeTruthy();
    })
    it('isPhone', function () {
      expect(rules.isPhone('029-8784326-11316')).toBeTruthy();
    })
    it('isAreaNum', function () {
      expect(rules.isAreaNum('029')).toBeTruthy();
    })
    it('isHostNum', function () {
      expect(rules.isHostNum('8784326')).toBeTruthy();
    })
    it('isExtensionNum', function () {
      expect(rules.isExtensionNum('11316')).toBeTruthy();
    })
    it('isIp', function () {
      expect(rules.isIp('192.168.0.1')).toBeTruthy();
    })
  })
});








