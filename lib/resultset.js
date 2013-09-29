'use strict';

module.exports = ResultSet;

function ResultSet(resultset) {
  this.__resultset = resultset;
}

ResultSet.prototype.destory = function () {
  this.__resultset.destory();
  return this;
};

ResultSet.prototype.option = function (key, val) {
  switch (arguments.length) {
    case 1:
      return this.getOption(key);
      break;
    case 2:
      return this.setOption(key, val);
      break;
  }
  return false;
};

ResultSet.prototype.getOption = function (key) {
  return this.__resultset.option(key);
};

ResultSet.prototype.setOption = function (key, val) {
  return this.__resultset.option(key, val);
};

ResultSet.prototype.size = function () {
  return this.__resultset.size();
};

ResultSet.prototype.record = function (index) {
  return this.__resultset.record(index);
};

ResultSet.prototype.records = function (start, count) {
  if (arguments.length === 1) {
    count = start;
    start = 0;
  }
  if (typeof count !== 'number') {
    return false;
  }
  return this.__resultset.records(start, count);
};
