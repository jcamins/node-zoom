'use strict';

var zoom = require('./lib');
var connection = new zoom.Connection('192.83.186.170:210/INNOPAC');

connection.connect(function (err) {
  if (err) {
    return console.error(err);
  }
  var query = zoom.query.prefix('@attr 1=4 台灣');
  connection.search(query, function (recordset) {
  });
});
