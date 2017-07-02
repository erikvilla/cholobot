'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cache = require('./database/cache.js');

var _cache2 = _interopRequireDefault(_cache);

var _staticResponses = require('./data/staticResponses.js');

var _staticResponses2 = _interopRequireDefault(_staticResponses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.command('start', function (ctx) {
    ctx.reply('Welcome!');
  });

  app.command('rules', function (ctx) {
    var rules = _cache2.default.getValue('rules');
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
    var index = Math.floor(Math.random() * _staticResponses2.default.buenas.length - 1 + 1);
    ctx.reply(_staticResponses2.default.buenas[index]);
  });

  app.command('next', function (ctx) {
    var name = getNextName(people);
    setCurrent();
  });
};