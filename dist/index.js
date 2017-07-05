'use strict';

var _telegraf = require('telegraf');

var _telegraf2 = _interopRequireDefault(_telegraf);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _rule = require('./model/rule.js');

var _rule2 = _interopRequireDefault(_rule);

var _commands = require('./commands');

var _commands2 = _interopRequireDefault(_commands);

var _actions = require('./database/actions.js');

var _cache = require('./database/cache.js');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** static data **/
(0, _actions.getRules)().then(function (result) {
  _cache2.default.setValue('allRules', result.map(function (rule) {
    return rule.rule;
  }));
  _cache2.default.setValue('rules', result);
}).then((0, _actions.getMortos)().then(function (result) {
  _cache2.default.setValue('people', result);
}));

/** telegram app **/
var token = process.env.token || _config2.default.get('token');
var URL = process.env.URL || _config2.default.get('URL');
var PORT = process.env.PORT || 5000;
var isDevelopment = process.env.NODE_ENV === 'development';

var app = new _telegraf2.default(token);
/** commands **/
(0, _commands2.default)(app);

if (isDevelopment) {
  app.startPolling();
} else {
  app.telegram.setWebhook(URL + '/bot' + token);
  app.startWebhook('/bot' + token, null, PORT);
}