'use strict';

var $ = require('jquery');
var _extend = require('lodash/extend');

function Weather(provider, storage, options) {
    this.provider = provider;
    this.storage = storage;
    this.setConfig(options);
    this.render();
};

(function () {
    var Weather = this;

    var config = {
        propWeather: 'weather'
    };

    Weather.setConfig = function (options) {
        var _this = this;

        _this.config = _extend({
            el: '#weather',
            units: 'metric',
            lang: 'es'
        }, options);
    }

    Weather.render = function () {
        var _this = this;

        if (!_this.storage.hasExpireItem(config.propWeather)) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;

                _this.getWeatherByCoordinates(lat, lon, function (data) {
                    _this.storage.setExpireItem(config.propWeather, {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                        weather: data
                    }, 60 * 60);

                    _render.bind(_this)(data);
                });
            });
        } else {
            _render.bind(_this)(_this.storage.getExpireItem(config.propWeather).weather);
        }
    }

    function _render (data) {
        var _this = this;

        document.querySelector(_this.config.el).textContent = data.temp + 'º';
    }

    Weather.getWeatherBySearch = function (q, callback) {
        var _this = this;
        _this.provider.getWeatherBySearch(q, callback);
    }

    Weather.getWeatherByCoordinates = function (lat, lon, callback) {
        var _this = this;
        _this.provider.getWeatherByCoordinates(lat, lon, callback);
    }
}).apply(Weather.prototype);

module.exports = Weather;
