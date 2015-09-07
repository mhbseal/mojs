/**
 * pub/sub test
 */
define(['pubSub'], function (pubSub) {
	"use strict";

  describe('pubSub', function () {
    var
      data = [{
        name: '熊大',
        job: '阻止光头强砍树'
      }, {
        name: '熊二',
        job: '调戏光头强'
      }, {
        name: '光头强',
        job: '伐木工'
      }],
      dataRet = [
        '熊大应该阻止光头强砍树',
        '熊二没事就调戏光头强',
        '光头强是个伐木工'
      ],
      ret = [];

    it('subscribe and publish', function () {
      pubSub.subscribe('a', function(data) {
        ret[0] = data.name + '应该' + data.job;
      })
      pubSub.subscribe('a.b', function(data) {
        ret[1] = data.name + '没事就' + data.job;
      })
      pubSub.subscribe('c', function(data) {
        ret[2] = data.name + '是个' + data.job;
      })
      pubSub.publish('a', data[0]);
      pubSub.publish('a.b', data[1]);
      pubSub.publish('c', data[2]);
      expect(ret[0]).toEqual(dataRet[0]);
      expect(ret[1]).toEqual(dataRet[1]);
      expect(ret[2]).toEqual(dataRet[2]);
    })
    it('unsubscribe and publish', function () {
      pubSub.unsubscribe('a');
      pubSub.publish('a', data[0]);
      pubSub.publish('a.b', data[1]);
      expect(ret[0]).toBeDefined();
      expect(ret[1]).toEqual(dataRet[1]);
    })
    it('clear and publish', function () {
      pubSub.clear('a');
      pubSub.publish('a.b', data[1]);
      pubSub.publish('c', data[2]);
      expect(ret[1]).toBeDefined();
      expect(ret[2]).toBeDefined();
    })
  })
});