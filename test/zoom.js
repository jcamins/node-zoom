'use strict';

var expect = require('chai').expect;
var zoom = require('../lib');
var conn = new zoom.Connection('192.83.186.170:210/INNOPAC');

before(function (done) {
  conn.connect(function (err) {
    if (err) {
      throw err;
    }
    done();
  });
});

describe('connection', function () {
  describe('.search()', function () {
    it('should run widthout error', function (done) {
      var query = new zoom.Query('@attr 1=4 台灣');
      conn.search(query, function (err) {
        expect(err).to.be.null;
        done();
      });
    });
  });

  describe('.scan()', function () {
    it('should run widthout error', function (done) {
      var query = new zoom.Query('@attr 1=4 台灣');
      conn.scan(query, function (err) {
        expect(err).to.be.null;
        done();
      });
    });
  });
});
