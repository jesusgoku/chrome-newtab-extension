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
}).apply(Storage.prototype);

module.exports = Storage;
