'use strict';

var zoom = require('../build/Release/zoom.node');

module.exports = Connection;

function Connection(host, port, database, user, pass) {
  var that = this;
  var connection = zoom.connection.create();
  var options = getOptions(connection, arguments);

  this.__connection = connection;
  this.hostname = options.hostname;
  this.port = options.port;

  delete options.hostname;
  delete options.port;

  Object.keys(options).forEach(function (key) {
    if (options[key]) {
      that.option(key, options[key]);
    }
  });
}

// class methods

Connection.create = function () {
  return new Connection.apply(null, arguments);
};

// instance methods

Connection.prototype.connect = function (hostname, port, done) {
  switch (arguments.length) {
    case 1:
      if (typeof hostname === 'function') {
        done = hostname;
        hostname = undefined;
      }
    case 2:
      if (typeof port === 'function') {
        done = port;
        port = undefined;
      }
      break;
  }

  var args = [];
  var that = this;
  var connection = this.__connection;
  
  hostname = hostname || this.hostname;
  port = port || this.port;

  hostname && args.push(hostname);
  port && args.push(port);

  done = done || function () {};

  setImmediate(function () {
    try {
      connection.connect.apply(connection, args);
    } catch (err) {
      return done(err);
    }
    done(null);
  });
};

Connection.prototype.option = function (key, val) {
  switch (arguments.length) {
    case 1:
      return this.setOption(key, val);
      break;
    case 2:
      return this.getOption(key);
      break;
    default:
      return false;
  }
};

Connection.prototype.setOption = function (key, val) {
  return this.__connection.option(key, val);
};

Connection.prototype.getOption = function (key) {
  return this.__connection.option(key);
};

Connection.prototype.scan = function (query, callback) {
  var connection = this.__connection;
  setImmediate(function () {
    var scanset;
    try {
      scanset = connection.scan(query);
    } catch (e) {
      return callback(e);
    }
    callback(null, scanset);
  });
};

Connection.prototype.search = function (query, callback) {
  var connection = this.__connection;
  setImmediate(function () {
    var resultset;
    try {
      resultset = connection.search(query);
    } catch (e) {
      return callback(e);
    }
    callback(null, resultset);
  });
};

Connection.prototype.close = function () {
  this.__connection.close();
};

// functions

function getOptions(connection, options) {
  var urlstrRegexp = /^(?:(.+):(.+)@)?([\w\.]+)(?:\:(\d+))?(?:\/(\w+))?$/;
  var data = {
    hostname: null,
    port: null,
    password: null,
    user: null,
    databaseName: null
  };

  switch (options.length) {
    case 1:
      var match = options[0].match(urlstrRegexp);
      data.user = match[1];
      data.password = match[2];
      data.hostname = match[3];
      data.port = match[4];
      data.databaseName = match[5];
      break;
    case 2:
      data.hostname = options[0];
      data.port = options[1];
      data.database = options[2];
  }

  return data;
}
