'use strict';

var zoom = require('../build/Release/zoom.node');
var Connection = require('./connsction');
var Query = require('./query');
var ResultSet = require('./resultset');

module.exports = {
  Connection: Connection,
  Query: Query,
  Record: zoom.record,
  ResultSet: ResultSet
};
