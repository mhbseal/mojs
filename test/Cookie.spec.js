/**
 * rules test
 */
define(['rules'], function (rules) {
	"use strict";

  describe('rules', function () {
    it('isRequired', function () {
      expect(rules.isRequired('非空，即为必需')).toBeTruthy();
      expect(rules.isRequired('')).toBeFalsy();
    })
  })
});