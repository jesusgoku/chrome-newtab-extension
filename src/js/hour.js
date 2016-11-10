'use strict';

var _extend = require('lodash/extend');
var $ = require('jquery');
var moment = require('moment');

function Hour (options) {
    this.init(options);
};

(function () {
    var Hour = this;

    Hour.init = function (options) {
        var _this = this;

        _this.config = _extend({
            el: '#hour'
        }, options);

        _this.render();
    }

    Hour.render = function () {
        var _this = this;
        var now = moment();
        var minutes = null;
        var timer = setInterval(function () {
            if (null == minutes || minutes !== now.minutes()) {
                $(_this.config.el).text(now.format('HH:mm'));
                minutes = now.minutes();
            }
            now.add(1, 's');
        }, 1000);
    }
}).apply(Hour.prototype);

module.exports = Hour;
