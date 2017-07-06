"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (app, rules) {
    var _loop = function _loop(i) {
        app.command("rule" + (i + 1), function (ctx) {
            ctx.reply(rules[i].rule);
        });
    };

    for (var i = 0; i < rules.length; i++) {
        _loop(i);
    }
};