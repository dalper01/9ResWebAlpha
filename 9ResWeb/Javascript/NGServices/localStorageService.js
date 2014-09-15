

var storageServiceApp=angular.module('storageServiceApp', []);

storageServiceApp.factory('localStorageService', function ($rootScope) {

    //alert('creating localStorageService');

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


    // load data types from Local Cache
    $rootScope.contactInfo = _getLocalStorage("resume.contactInfo");
    if ($rootScope.contactInfo == 'undefined' || $rootScope.contactInfo == undefined) {
        $rootScope.contactInfo = {};
    }

    $rootScope.education = _getLocalStorage("resume.education");
    if ($rootScope.education == 'undefined' || $rootScope.education == undefined) {
        $rootScope.education = { colleges: [], certificates: [], highSchools: [] };
    }


    $rootScope.jobs = _getLocalStorage("resume.jobs");
    if ($rootScope.jobs == 'undefined' || $rootScope.jobs == undefined) {
        $rootScope.jobs = [];
    }



    return {
        getLocalStorage: _getLocalStorage,
        saveLocalStorage: _saveLocalStorage

    };



})