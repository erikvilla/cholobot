'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mortoSchema = _mongoose2.default.Schema({
  name: String,
  current: Boolean
});

var Morto = _mongoose2.default.model('Morto', mortoSchema);

exports.default = Morto;