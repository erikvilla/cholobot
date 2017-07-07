'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cache = require('./database/cache.js');

var _cache2 = _interopRequireDefault(_cache);

var _staticResponses = require('./data/staticResponses.js');

var _staticResponses2 = _interopRequireDefault(_staticResponses);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var giphyUrl = process.env.giphy_url || _config2.default.get('giphy_url');
var giphyToken = process.env.giphy_token || _config2.default.get('giphy_token');
var limit = 25;

exports.default = function (app) {
  app.command('start', function (ctx) {
    ctx.reply('Welcome!');
  });

  app.command('rules', function (ctx) {
    var rules = _cache2.default.getValue('allRules');
    var ruleString = rules.join('\n');
    ctx.reply(ruleString);
  });

  app.command('mortos', function (ctx) {
    var people = _cache2.default.getValue('people');
    var nameArray = people.map(function (person) {
      return person.current ? '*' + person.name + '*' : person.name;
    });
    var peopleString = nameArray.join('\n');
    ctx.reply(peopleString);
  });

  app.command('qtvv', function (ctx) {
    ctx.reply(_staticResponses2.default['qtvv']);
  });

  app.command('buenas', function (ctx) {
    var index = getRandomNum(_staticResponses2.default.buenas.length - 1 + 1);
    ctx.reply(_staticResponses2.default.buenas[index]);
  });

  app.command('next', function (ctx) {
    var name = getNextName(people);
    setCurrent();
  });

  app.command('0fucks', function (ctx) {
    var queryString = 'zero fucks';
    return promiseReply(queryString, ctx);
  });

  app.command('fucku', function (ctx) {
    var queryString = 'fuck you';
    return promiseReply(queryString, ctx);
  });

  var promiseReply = function promiseReply(queryString, ctx) {
    var random = getRandomNum(limit);
    var url = getSearchGiphyURL(queryString);
    _axios2.default.get(url).then(function (response) {
      if (response.status === _httpStatusCodes2.default.OK) {
        ctx.reply(response.data.data[random].url);
      }
    }).catch(function (error) {
      console.log(error);
      ctx.reply('error');
    });
  };

  var getRandomNum = function getRandomNum(limit) {
    return Math.floor(Math.random() * limit);
  };

  var getSearchGiphyURL = function getSearchGiphyURL(queryString) {
    return giphyUrl + 'search?api_key=' + giphyToken + '&q=' + encodeURIComponent(queryString) + '&limit=' + limit;
  };

  app.command('jaja', function (ctx) {
    ctx.reply(_staticResponses2.default['jaja']);
  });

  app.command('chupala', function (ctx) {
    var index = getRandomNum(_staticResponses2.default.chupala.length - 1 + 1);
    ctx.reply(_staticResponses2.default.chupala[index]);
  });

  app.command('vv', function (ctx) {
    ctx.reply(_staticResponses2.default['vv']);
  });

  app.command('hpvv', function (ctx) {
    ctx.reply(_staticResponses2.default['hpvv']);
  });

  app.command('fuck', function (ctx) {
    var queryString = 'what the fuck';
    return promiseReply(queryString, ctx);
  });
};