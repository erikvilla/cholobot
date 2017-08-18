'use strict';

var _telegraf = require('telegraf');

var _telegraf2 = _interopRequireDefault(_telegraf);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _bot = require('./bot.js');

var _bot2 = _interopRequireDefault(_bot);

var _actions = require('./database/actions.js');

var _cache = require('./database/cache.js');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** telegram app **/
var token = process.env.token || _config2.default.get('token');
var URL = process.env.URL || _config2.default.get('URL');
var PORT = process.env.PORT || 5000;
var isDevelopment = process.env.NODE_ENV === 'development';

var app = new _telegraf2.default(token);

/** static data **/
(0, _actions.getRules)().then(function (result) {
  _cache2.default.setValue('allRules', result.map(function (rule) {
    return rule.rule;
  }));
  /** creating bot instance **/
  (0, _bot2.default)(app);
}).then((0, _actions.getMortos)().then(function (result) {
  _cache2.default.setValue('people', result);
}));

if (isDevelopment) {
  app.startPolling();
} else {
  app.telegram.setWebhook(URL + '/bot' + token);
  app.startWebhook('/bot' + token, null, PORT);
}