'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCurrent = exports.insertMorto = exports.getMortos = exports.getRules = exports.connect = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _rule = require('../model/rule.js');

var _rule2 = _interopRequireDefault(_rule);

var _morto = require('../model/morto.js');

var _morto2 = _interopRequireDefault(_morto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = null;

var connect = function connect() {
  if (!db) {
    var dbURL = process.env.db_url || _config2.default.get('db_url');
    _mongoose2.default.connect(dbURL);
    db = _mongoose2.default.connection;
  }
};

var getRules = function getRules() {
  connect();
  return _rule2.default.find();
};

var getMortos = function getMortos() {
  connect();
  return _morto2.default.find();
};

var insertMorto = function insertMorto(name) {
  connect();
  var newRow = new _morto2.default({
    name: name
  });
  return newRow.save();
};

var setCurrent = function setCurrent(name) {
  connect();
  _morto2.default.update({ name: name }, { current: true }, { multi: true, strict: false }, function (error, object) {} // TODO: Implement
  );
};

exports.connect = connect;
exports.getRules = getRules;
exports.getMortos = getMortos;
exports.insertMorto = insertMorto;
exports.setCurrent = setCurrent;