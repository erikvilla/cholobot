'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fuck = exports.hpvv = exports.vv = exports.chupala = exports.jaja = exports.fucku = exports.zerofucks = exports.next = exports.buenas = exports.qtvv = exports.mortos = exports.rules = undefined;

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

var _actions = require('./database/actions.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var giphyUrl = process.env.giphy_url || _config2.default.get('giphy_url');
var giphyToken = process.env.giphy_token || _config2.default.get('giphy_token');
var GIPHY_API_LIMIT = 25;

var promiseReply = function promiseReply(queryString, ctx) {
    var random = getRandomNum(GIPHY_API_LIMIT);
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
    return giphyUrl + 'search?api_key=' + giphyToken + '&q=' + encodeURIComponent(queryString) + '&limit=' + GIPHY_API_LIMIT;
};

var rules = exports.rules = function rules(ctx) {
    var rules = _cache2.default.getValue('allRules');
    var i = 1;
    rules = rules.map(function (rule) {
        return i++ + '.- ' + rule;
    });
    var ruleString = rules.join('\n');
    ctx.reply(ruleString);
};

var mortos = exports.mortos = function mortos(ctx) {
    var people = _cache2.default.getValue('people');
    var nameArray = people.map(function (person) {
        return person.current ? '*' + person.name + '*' : person.name;
    });
    var peopleString = nameArray.join('\n');
    ctx.reply(peopleString);
};

var qtvv = exports.qtvv = function qtvv(ctx) {
    ctx.reply(_staticResponses2.default['qtvv']);
};

var buenas = exports.buenas = function buenas(ctx) {
    var index = getRandomNum(_staticResponses2.default.buenas.length);
    ctx.reply(_staticResponses2.default.buenas[index]);
};

var getNextName = function getNextName(index) {
    var name = '';
    var people = _cache2.default.getValue('people');
    var lastIndex = people.length - 1;
    if (index === 0) {
        name = people[lastIndex].name;
    } else {
        name = people[index - 1].name;
    }

    return name;
};

var next = exports.next = function next(ctx) {
    var people = _cache2.default.getValue('people');
    (0, _actions.removeCurrentMorto)().then(function (morto) {
        var mortoName = morto.name;
        var index = people.findIndex(function (morto) {
            return morto.name === mortoName;
        });
        var name = getNextName(index);
        (0, _actions.setCurrent)(name);
    }).then((0, _actions.getMortos)().then(function (result) {
        _cache2.default.setValue('people', result);
    }));
};

var zerofucks = exports.zerofucks = function zerofucks(ctx) {
    var queryString = 'zero fucks';
    return promiseReply(queryString, ctx);
};

var fucku = exports.fucku = function fucku(ctx) {
    var queryString = 'fuck you';
    return promiseReply(queryString, ctx);
};

var jaja = exports.jaja = function jaja(ctx) {
    ctx.reply(_staticResponses2.default['jaja']);
};

var chupala = exports.chupala = function chupala(ctx) {
    var index = getRandomNum(_staticResponses2.default.chupala.length);
    ctx.reply(_staticResponses2.default.chupala[index]);
};

var vv = exports.vv = function vv(ctx) {
    ctx.reply(_staticResponses2.default['vv']);
};

var hpvv = exports.hpvv = function hpvv(ctx) {
    ctx.reply(_staticResponses2.default['hpvv']);
};

var fuck = exports.fuck = function fuck(ctx) {
    var queryString = 'what the fuck';
    return promiseReply(queryString, ctx);
};