'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cache = require('./database/cache.js');

var _cache2 = _interopRequireDefault(_cache);

var _commands = require('./commands.js');

var commands = _interopRequireWildcard(_commands);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {

    //Adding commands to bot
    app.command('start', function (ctx) {
        ctx.reply('Welcome!');
    });

    var rules = _cache2.default.getValue('allRules');

    var _loop = function _loop(i) {
        app.command('rule' + (i + 1), function (ctx) {
            ctx.reply(rules[i]);
        });
    };

    for (var i = 0; i < rules.length; i++) {
        _loop(i);
    }

    //Adding all commands to bot

    var _loop2 = function _loop2() {
        var cmd = commands[cmdName];
        app.command(cmdName, function (ctx) {
            cmd(ctx);
        });
    };

    for (var cmdName in commands) {
        _loop2();
    }
};