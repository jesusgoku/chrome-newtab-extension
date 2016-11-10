'use stritc';

var getRandomInt = require('./util.js').getRandomInt;
var $ = require('jquery');



function App(storage, modules, options) {
    this.storage = storage;
    this.modules = modules;
    this.init(options);
};

(function () {
    var _this = this;
    _this.init = function (options) {
        var _this = this;

        _this.config = $.extend({
            askFullNameQuestion: '¡Hola! ... ¿Como debería llamarte? ...',
            domFullName: '#full_name',
            propFullName: 'full_name',
            propBackgroundImage: 'background_image',
            propBackgroundImageWidth: 'background_image_width',
            propBackgroundImageHeight: 'background_image_height',
            propBackgroundImageTimestamp: 'background_image_timestamp',
            eventBackgroundImageUpdate: 'background_image.update',
            urlList: 'https://unsplash.it/list',
            urlImage: 'https://unsplash.it/__WIDTH__/__HEIGHT__/?image=__ID__',
            cacheHours: 24
        }, options);

        var now = new Date();

        _this.bodyWidth = window.screen.availWidth;
        _this.bodyHeight = window.screen.availHeight;

        if (!_this.storage.hasItem(_this.config.propBackgroundImage)
            || !_this.storage.hasItem(_this.config.propBackgroundImageTimestamp)
            || Math.floor(now / 1000) - _this.storage.getItem(_this.config.propBackgroundImageTimestamp) >= Math.floor(3600 * _this.config.cacheHours)) {
            _this.setRandomBackgroundImage();
        }

        if (!_this.storage.hasItem(_this.config.propFullName)) {
            _this.storage.setItem(_this.config.propFullName, _this.askFullName());
        }

        $(_this.config.domFullName).text(_this.storage.getItem(_this.config.propFullName));

        $('body')
            .on(_this.config.eventBackgroundImageUpdate, _this.changeBackgroundImage.bind(_this))
            .trigger(_this.config.eventBackgroundImageUpdate)
        ;
    }

    _this.askFullName = function () {
        return prompt(_this.config.askFullNameQuestion);
    }

    _this.setRandomBackgroundImage = function () {
        var _this = this;

        var request = $.ajax({
            url: _this.config.urlList,
        });

        request.done(function (data) {
            var index = getRandomInt(0, data.length - 1);
            var now = new Date();
            _this.storage.setItem(_this.config.propBackgroundImage, 'https://unsplash.it/' + _this.bodyWidth + '/' + _this.bodyHeight + '/?image=' + index);
            _this.storage.setItem(_this.config.propBackgroundImageTimestamp, Math.floor(now.getTime() / 1000));
            $('body').trigger(_this.config.eventBackgroundImageUpdate);
        });
    }

    _this.changeBackgroundImage = function (e) {
        $('body').css({'background-image': 'url("' + this.storage.getItem(this.config.propBackgroundImage) + '")'});
    }
}).apply(App.prototype);

module.exports = App;
