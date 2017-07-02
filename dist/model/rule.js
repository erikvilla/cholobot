'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleSchema = _mongoose2.default.Schema({
  rule: String
});
var Rule = _mongoose2.default.model('Rule', ruleSchema);

exports.default = Rule;