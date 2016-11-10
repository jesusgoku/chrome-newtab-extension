'use strict';

var exports = module.exports = {};

exports.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = exports;
