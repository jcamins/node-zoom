'use strict';

var zoom = require('../build/Release/zoom.node');
var Connection = require('./connsction');

module.exports = {
  Connection: Connection,
  query: zoom.query
};
