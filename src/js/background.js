'use strict';

var _extend = require('lodash/extend');

function Background(options) {
    this.setConfig(options);
};

(function () {
    var Background = this;

    Background.setConfig = function (options) {
        var _this = this;

        _this.config = _extend({

        }, options);
    }

    Background.render = function () {}
}).apply(Background.prototype);

module.exports = Background;
