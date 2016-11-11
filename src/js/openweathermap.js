'use strict';

var $ = require('jquery');
var _extend = require('lodash/extend');

function OpenWeatherMap(apiKey, options) {
    var _this = this;

    _this.apiKey = apiKey;
    _this.setConfig(options);
};

(function () {
    var _this = this;

    var config = {
        apiBaseUrl: 'http://api.openweathermap.org/data/2.5/weather'
    };

    _this.setConfig = function (options) {
        var _this = this;
        _this.config = _extend({
            units: 'metric',  // metric, imperial
            lang: 'es'  // en, ru, it, es, uk, de, pt, ro, pl, fi, nl, fr, bg, sv, zh, tr, hr, ca
        }, options);
    }

    _this.getWeatherBySearch = function (q, callback) {
        var _this = this;

        $.ajax({
            url: config.apiBaseUrl,
            data: {
                q: q,
                APPID: _this.apiKey,
                lang: _this.config.lang,
                units: _this.config.units
            },
            success: function (data) {
                callback(apiToStandardTransform(data));
            }
        });
    }

    _this.getWeatherByCoordinates = function (lat, lon, callback) {
        var _this = this;

        $.ajax({
            url: config.apiBaseUrl,
            data: {
                lat: lat,
                lon: lon,
                APPID: _this.apiKey,
                lang: _this.config.lang,
                units: _this.config.units
            },
            success: function (data) {
                callback(apiToStandardTransform(data));
            }
        });
    }

    function apiToStandardTransform(data) {
        return {
            temp: data.main.temp,
            min: data.main.temp_min,
            max: data.main.temp_max
        };
    }
}).apply(OpenWeatherMap.prototype);

module.exports = OpenWeatherMap;
