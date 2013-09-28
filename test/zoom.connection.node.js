'use strict';

var expect = require('chai').expect;
var zoom = require('../build/Release/zoom.node');

describe('connection', function () {

  describe('.option()', function () {
    var connection = zoom.connection.create();

    it('should set option value', function () {
      var setHostname = connection.option('hostname', '192.83.186.170');
      var setDBName = connection.option('databaseName', 'INNOPAC');
      expect(setHostname).to.be.true;
      expect(setDBName).to.be.true;
    });

    it('should get option value', function () {
      expect(connection.option('port')).to.be.a('null');
      expect(connection.option('hostname')).to.equal('192.83.186.170');
      expect(connection.option('databaseName')).to.equal('INNOPAC');
    });
  });

  describe('.connect()', function () {

    it('should throw an error', function () {
      var connection = zoom.connection.create();
      expect(function () {
        connection.connect('192.83.186.170:210', 'INNOPAC');
      }).to.throw(Error);
    });

  });

});
