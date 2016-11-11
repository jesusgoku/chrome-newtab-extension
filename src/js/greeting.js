'use strict';

var _extend = require('lodash/extend');

function Greeting(storage, options) {
    this.storage = storage;
    this.setConfig(options);
    this.init();
    this.render();
};

(function () {
    var Greeting = this;

    Greeting.setConfig = function (options) {
        var _this = this;

        _this.config = _extend({
            el: '#greeting',
            propName: 'full_name',
            askNameQuestion: '¡Hola! ... ¿Como debería llamarte? ...'
        }, options);
    }

    Greeting.init = function () {
        var _this = this;

        if (!_this.storage.hasItem(_this.config.propName)) {
            _this.storage.setItem(
                _this.config.propName,
                prompt(_this.config.askNameQuestion)
            );
        }
    }

    Greeting.render = function () {
        var _this = this;
        var name = _this.storage.getItem(_this.config.propName);
        var greeting = '¡' + _this.getGreeting() + ', ' + name + '!';

        document.querySelector(_this.config.el).textContent = greeting;
    }

    Greeting.getGreeting = function () {
        var now = new Date();
        var hour = now.getHours();

        if (hour >= 0 && hour < 12) {
            return 'Buenos días';
        } else if (hour >= 12 && hour < 20) {
            return 'Buenas tardes';
        } else if (hour >= 20) {
            return 'Buenas noches';
        } else {
            return 'Buen día';
        }
    }
}).apply(Greeting.prototype);

module.exports = Greeting;
