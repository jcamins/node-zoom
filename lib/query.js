'use strict';

var zoom = require('../build/Release/zoom.node');

module.exports = Query;

function Query(type, queryString) {
  if (arguments.length === 1) {
    queryString = type;
    type = 'prefix';
  }
  this.__query = zoom.query[type](queryString || '');
}

Query.prototype.getData = function () {
  return this.__query;
};
