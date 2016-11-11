'use strict';

var App = require('./app.js');
var Storage = require('./storage.js');
var Hour = require('./hour.js');
var Quote = require('./quote.js');
var Greeting = require('./greeting.js');
var Weather = require('./weather.js');
var OpenWeatherMap = require('./openweathermap.js');
var $ = require('jquery');

// -- CSS
require('../css/app.css');

var storage = new Storage();

$(function () {
    new App(storage, [
        new Hour(),
        new Quote(),
        new Greeting(storage),
        new Weather(new OpenWeatherMap('142c719139cd4b42b5c9f43892134f97'), storage)
    ], {});
});
