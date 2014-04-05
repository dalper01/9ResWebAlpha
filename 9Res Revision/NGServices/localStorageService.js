

var storageServiceApp=angular.module('storageServiceApp', []);

storageServiceApp.factory('localStorageService', function() {


    var _getLocalStorage = function (storageKey) {

        var storageVariable = [];
        var localValue = localStorage.getItem(storageKey);

        // check if value is correct
        if ((localValue === undefined) || (localValue == 'undefined') ||
            (localValue == null ) ) {

            // return null
            return null;
        }
        else {
            storageVariable = JSON.parse(localValue);
            };

        return storageVariable;
    }


    var _saveLocalStorage = function (storageKey, storageVal) {
        localStorage.setItem(storageKey, JSON.stringify(storageVal));

    }


    return {
        getLocalStorage: _getLocalStorage,
        saveLocalStorage: _saveLocalStorage

    };


})