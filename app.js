;(function ($) {
    $(function () {
        new JesusGokuNewTab({});
    });

    var JesusGokuNewTab = (function ($) {
        function App(options) {
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

                if (!_this.hasProperty(_this.config.propBackgroundImage)
                    || !_this.hasProperty(_this.config.propBackgroundImageTimestamp)
                    || Math.floor(now / 1000) - _this.getProperty(_this.config.propBackgroundImageTimestamp) >= Math.floor(3600 * _this.config.cacheHours)) {
                    _this.setRandomBackgroundImage();
                }

                if (!_this.hasProperty(_this.config.propFullName)) {
                    _this.setProperty(_this.config.propFullName, _this.askFullName());
                }

                $(_this.config.domFullName).text(_this.getProperty(_this.config.propFullName));

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
                    var index = _this.getRandomInt(0, data.length - 1);
                    var now = new Date();
                    _this.setProperty(_this.config.propBackgroundImage, 'https://unsplash.it/' + _this.bodyWidth + '/' + _this.bodyHeight + '/?image=' + index);
                    _this.setProperty(_this.config.propBackgroundImageTimestamp, Math.floor(now.getTime() / 1000));
                    $('body').trigger(_this.config.eventBackgroundImageUpdate);
                });
            }

            _this.changeBackgroundImage = function (e) {
                $('body').css({'background-image': 'url("' + this.getProperty(this.config.propBackgroundImage) + '")'});
            }

            _this.getRandomInt = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            _this.hasProperty = function (property) {
                return null !== window.localStorage.getItem(property);
            }

            _this.setProperty = function (property, value) {
                window.localStorage.setItem(property, value);
                return this;
            }

            _this.getProperty = function (property) {
                return window.localStorage.getItem(property);
            }
        }).apply(App.prototype);

        return App;
    })($)
})(jQuery);
