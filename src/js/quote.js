'use strict';

var _extend = require('lodash/extend');
var $ = require('jquery');
var quotes = require('./quotes.json');
var getRandomInt = require('./util.js').getRandomInt;

function Quote(options) {
    this.setConfig(options);
    this.render();
};

(function () {
    var Quote = this;

    Quote.setConfig = function (options) {
        var _this = this;

        _this.config = _extend({
            el: '#quote'
        }, options);
    }

    Quote.render = function () {
        var _this = this;
        var $quote = $(_this.config.el);
        var quote = quotes[getRandomInt(0, quotes.length - 1)];
        $('.quote', $quote).text(quote.quote);
        $('.author', $quote).text(quote.author);
    }
}).apply(Quote.prototype);

module.exports = Quote;
