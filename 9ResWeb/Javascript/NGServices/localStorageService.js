

var storageServiceApp=angular.module('storageServiceApp', []);

storageServiceApp.provider('localStorageService', [function localStorageServiceProvider($rootScope) {

    var initInjector = angular.injector(['ng']);
    //var $q = initInjector.get('$q');

    /// Declare Service Variables
    var _preloaded = false;
    var _contactInfo;
    var _education;
    var _jobs;
    var _skills;
    var _objectives;


    // Declare Getters
    var _getContactInfo = function () {
        if (!_contactInfo.addrState) {
            _contactInfo.addrState = "";
        }

        if (!_contactInfo) {
            _contactInfo = {};
            return _contactInfo;
        }

        return _contactInfo;
    }
    var _getEducation = function () {
        return _education;
    }

    var _getJobs = function () {
        if (!Array.isArray(_jobs)) {
            _jobs = [];
        }
        return _jobs;
    }

    var _getSkills = function () {
        if (!Array.isArray(_skills)) {
            _skills = [];
        }
        return _skills;
    }
    var _getObjectives = function () {
        if (!Array.isArray(_objectives)) {
            _objectives = [];
        }
        return _objectives;
    }

    // Declare Setters
    var _setContactInfo = function (new_contactInfo) {
        _contactInfo = new_contactInfo;
    }
    var _setEducation = function (new_education) {
        _education = new_education;
    }
    var _setJobs = function (new_jobs) {
        _jobs = new_jobs;
    }
    var _setSkills = function (new_skills) {
        _skills = new_skills;
    }
    var _setObjectives = function (new_objectives) {
        _objectives = new_objectives;
    }


    /// LocalStorage Load / Save
    var _getLocalStorage = function (storageKey) {

        //if (typeof (Storage) !== "undefined") {
        //}

        var storageVariable = [];
        var localValue = localStorage.getItem(storageKey);

        // check if value is correct
        if ((localValue === undefined) || (localValue == 'undefined') ||
            (localValue == null)) {

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


    // Skills
    var _loadLocalStorageSkills = function () {

        _skills = _getLocalStorage("resume.skills");
        if (_skills == 'undefined' || _skills == undefined) {
            _skills = [];
        }
    }

    var _saveLocalStorageSkills = function () {
        _saveLocalStorage("resume.skills", _skills);
    }


    // Objectives
    var _loadLocalStorageObjectives = function () {

        _objectives = _getLocalStorage("resume.objectives");
        //if (_objectives == 'undefined' || _objectives == undefined || _objectives == null) {
        //    _objectives = [];
        //}constructor === Array
        if (!Array.isArray(_objectives)) {
            _objectives = [];
        }
    }

    var _saveLocalStorageObjectives = function () {
        _saveLocalStorage("resume.objectives", _objectives);
    }


    /// Initialize Data for Resume sent from Server
    this.init = function (data) {
        _preloaded = true;
        //_contactInfo = data.contactInfo;
        _setContactInfo(data.contactInfo);
        _education = data.education;
        _setJobs(data.jobs);
        //_jobs = data.jobs;
        _skills = data.skills;
        _objectives = data.objectives;

        //_saveLocalStorageContactInfo();
        //_saveLocalStorageEducation();
        //_saveLocalStorageJobs();
        //_saveLocalStorageSkills();
        //_saveLocalStorageObjectives();

        console.log('Razor data: ' + data);
    };



    /// Create Service Object

    this.$get = ['$http', function ($http) {

        // Pulling Resume Values from Repo
        if (_preloaded == false) {
            _loadLocalStorageContactInfo();
            _loadLocalStorageEducation();
            _loadLocalStorageJobs();
            _loadLocalStorageSkills();
            _loadLocalStorageObjectives();
        }

        // Exposed Methods
        return {

            // exposed ContactInfo Methods
            GetContactInfo: _getContactInfo,
            SetContactInfo: _setContactInfo,
            LoadStorageContactInfo: _loadLocalStorageContactInfo,
            SaveStorageContactInfo: _saveLocalStorageContactInfo,

            // exposed Education Methods
            GetEducation: _getEducation,
            SetEducation: _setEducation,
            LoadStorageEducation: _loadLocalStorageEducation,
            SaveStorageEducation: _saveLocalStorageEducation,

            // exposed Career Methods
            GetJobs: _getJobs,
            SetJobs: _setJobs,
            LoadStorageJobs: _loadLocalStorageJobs,
            SaveStorageJobs: _saveLocalStorageJobs,

            // exposed Skills Methods
            GetSkills: _getSkills,
            SetSkills: _setSkills,
            LoadStorageSkills: _loadLocalStorageSkills,
            SaveStorageSkills: _saveLocalStorageSkills,

            // exposed Skills Methods
            GetObjectives: _getObjectives,
            SetObjectives: _setObjectives,
            LoadLocalStorageObjectives: _loadLocalStorageObjectives,
            SaveLocalStorageObjectives: _saveLocalStorageObjectives

        };
    }];




}]);
