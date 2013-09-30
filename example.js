'use strict';

var node = require('./build/Release/zoom.node');
var zoom = require('./lib');
var connection = new zoom.Connection('192.83.186.170:210/INNOPAC');

connection.connect(function (err) {
  if (err) {
    return console.error(err);
  }
  var query = new zoom.Query('@attr 1=4 台灣');
  connection.search(query, function (err, resultset) {
    var first = resultset.record(1);
    console.log(first.txml());
  });
});
