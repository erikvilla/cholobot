"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cache = function () {
  function Cache(initObject) {
    _classCallCheck(this, Cache);

    if (!Cache.instance) {
      this.data = {};
      Cache.instance = this;
    }
  }

  _createClass(Cache, [{
    key: "setValue",
    value: function setValue(key, value) {
      this.data[key] = value;
    }
  }, {
    key: "getValue",
    value: function getValue(key) {
      return this.data[key];
    }
  }]);

  return Cache;
}();

var instance = new Cache();
exports.default = instance;