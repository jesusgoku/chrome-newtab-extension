'use strict';

var Storage = function () {};

(function () {
    var Storage = this;
    var _storage = window.localStorage;

    Storage.hasItem = function (prop) {
        return null !== _storage.getItem(prop);
    }

    Storage.setItem = function (prop, value) {
        _storage.setItem(prop, value);
        return Storage;
    }

    Storage.getItem = function (prop) {
        return _storage.getItem(prop);
    }

    Storage.removeItem = function (prop) {
        _storage.removeItem(prop);
        return Storage;
    }

    Storage.length = function () {
        return _storage.length;
    }

    Storage.clear = function () {
        _storage.clear();
        return Storage;
    }

    // -- Expire API
    Storage.setExpireItem = function (prop, value, expire) {
        var now = new Date();

        _storage.setItem(prop, JSON.stringify({
            data: value,
            timestamp: Math.floor(now.getTime() / 1000),
            expire: expire
        }));

        return Storage;
    }

    Storage.getExpireItem = function (prop) {
        var _this = this;

        if (!_this.hasExpireItem(prop)) {
            return;
        }

        var item = JSON.parse(_storage.getItem(prop));

        return item.data;
    }

    Storage.hasExpireItem = function (prop) {
        var item = _storage.getItem(prop);

        if (null === item) {
            return false;
        }

        item = JSON.parse(item);
        var now = new Date();

        if ((Math.floor(now.getTime() / 1000) - item.timestamp) > item.expire) {
            return false;
        }

        return true;
    }
}).apply(Storage.prototype);

module.exports = Storage;
