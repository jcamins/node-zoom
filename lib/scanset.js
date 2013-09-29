'use strict';

module.exports = ScanSet;

function ScanSet(scanset) {
  this.__scanset = scanset;
}

ScanSet.prototype.size = function () {
  return this.__scanset.size();
};

ScanSet.prototype.term = function () {
  return this.__scanset.term();
};
