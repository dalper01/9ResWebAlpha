

var storageServiceApp=angular.module('storageServiceApp', []);

storageServiceApp.factory('localStorageService', function ($rootScope) {


    /// Declare Service Variables

    //alert('creating localStorageService');
    var _contactInfo;
    var _education;
    var _jobs;


    // Declare Getters
    var _getContactInfo = function () { return _contactInfo; }
    var _getEducation = function () { return _education; }
    var _getJobs = function () { return _jobs; }




    /// Declare LocalStorage Load / Save

    var _getLocalStorage = function (storageKey) {

        //if (typeof (Storage) !== "undefined") {
        //}

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





    /// Declare service variable Loaders from Local Cache

    // ContactInfo
    var _loadLocalStorageContactInfo = function () {

        _contactInfo = _getLocalStorage("resume.contactInfo");

        if (_contactInfo == 'undefined' || _contactInfo == undefined) {
            _contactInfo = {};
        }

    }

    var _saveLocalStorageContactInfo = function () {
        _saveLocalStorage("resume.contactInfo", _contactInfo);
    }

    // Education
    var _loadLocalStorageEducation = function () {

        _education = _getLocalStorage("resume.education");

        if (_education == 'undefined' || _education == undefined) {
            _education = { colleges: [], certificates: [], highSchools: [] };
        }
    }

    var _saveLocalStorageEducation = function () {
        _saveLocalStorage("resume.education", _education);
    }


    // Jobs
    var _loadLocalStorageJobs = function () {

        _jobs = _getLocalStorage("resume.jobs");
        if (_jobs == 'undefined' || _jobs == undefined) {
            _jobs = [];
        }
    }

    var _saveLocalStorageJobs = function () {
        _saveLocalStorage("resume.jobs", _jobs);
    }



    // Pulling Resume Values from Repo
    _loadLocalStorageContactInfo();
    _loadLocalStorageEducation();
    _loadLocalStorageJobs();


    // Exposed Methods
    return {

        // exposed ContactInfo Methods
        GetContactInfo: _getContactInfo,
        LoadStorageContactInfo: _loadLocalStorageContactInfo,
        SaveStorageContactInfo: _saveLocalStorageContactInfo,

        // exposed Education Methods
        GetEducation: _getEducation,
        LoadStorageEducation: _loadLocalStorageEducation,
        SaveStorageEducation: _saveLocalStorageEducation,

        // exposed Career Methods
        GetJobs: _getJobs,
        LoadStorageJobs: _loadLocalStorageJobs,
        SaveStorageJobs: _saveLocalStorageJobs
    };



})