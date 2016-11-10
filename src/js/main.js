'use strict';

var App = require('./app.js');
var Storage = require('./storage.js');
var Hour = require('./hour.js');
var Quote = require('./quote.js');
var $ = require('jquery');

var css = require('../css/app.css');

$(function () {
    new App(new Storage(), [
        new Hour(),
        new Quote()
    ], {});
});
