
var educationApp = angular.module('educationApp', ['commonDirectives', 'navBarApp', 'storageServiceApp']);

educationApp.controller('educationController', function ($scope, $rootScope, localStorageService) {

    // -------------- initialize $scp[e Model --------------------- //
    //$scope.education = {};
    //$scope.education.colleges = [];
    //$scope.education.certificates = [];
    //$scope.education.highSchools = [];
    //$scope.highSchoolEdit = false;
    //$scope.collegeEdit = false;
    //$scope.collegeAdd = false;
    //$scope.certificateEdit = false;
    $scope.addNavShow = true;
    $scope.education = $rootScope.education;

    //var resetHighSchool = "";



    // if localstorage available
    //if(typeof(Storage)!=="undefined")
    //{

    //    getHighSchoolLocalStorage();
    //    getCollegesLocalStorage();
    //    getCertificatesLocalStorage();

    //};


    function getHighSchoolLocalStorage(){
        $scope.education = localStorageService.getLocalStorage("resume.education") || { colleges: [], certificates: [], highSchools: []};
    };


    function getCollegesLocalStorage(){
        $scope.education = localStorageService.getLocalStorage("resume.education") || { colleges: [], certificates: [], highSchools: []};
    };


    function getCertificatesLocalStorage(){
        $scope.education = localStorageService.getLocalStorage("resume.education") || { colleges: [], certificates: [], highSchools: [] };
    };





    $scope.saveHighSchoolLocalStorage = function(){
        localStorageService.saveLocalStorage("resume.education", $scope.education);
    };


    $scope.saveCollegesLocalStorage = function(){
        localStorageService.saveLocalStorage("resume.education", $scope.education);
    };


    $scope.saveCertificatesLocalStorage = function(){
        localStorageService.saveLocalStorage("resume.education", $scope.education);
    };






    $scope.resetHighSchool = function() {
        getHighSchoolLocalStorage();
    }



    $scope.resetColleges = function() {
        getCollegesLocalStorage();
    }



    $scope.resetCertificates = function() {
        getCertificatesLocalStorage();
    }



    // Form and Nav methods
    $scope.showNavHideForms = function() {

        //$scope.highSchoolEdit = false;
        $scope.addNavShow = true;
    }



    // activate Add/Edit Forms
    $scope.addHighSchool = function() {

        $scope.education.highSchools.push({ add: true});
        $scope.addNavShow = false;
    };

    $scope.editHighSchool = function(highSchool) {

        highSchool.edit = true;
        $scope.addNavShow = false;

    };

    $scope.deleteHighSchool = function(highSchool) {

        var i = $scope.education.highSchools.indexOf(highSchool);
        if(i != -1) {
            $scope.education.highSchools.splice(i, 1);
        }

        $scope.saveHighSchoolLocalStorage();
    };





    $scope.addCollege = function() {

        //$scope.collegeAdd = true;
        $scope.education.colleges.push({ add: true})
        $scope.addNavShow = false;

    };

    $scope.editCollege = function(college) {

        college.edit = true;
        $scope.addNavShow = false;

    };

    $scope.deleteCollege = function(college) {

        var i = $scope.education.colleges.indexOf(college);
        if(i != -1) {
            $scope.education.colleges.splice(i, 1);
        }
        $scope.saveCollegesLocalStorage();
    };



    $scope.addCertificate = function() {

        //$scope.certificateAdd = true;
        $scope.education.certificates.push({ add: true})
        $scope.addNavShow = false;

    };


    $scope.editCertificate = function(certificate) {

        certificate.edit = true;
        $scope.addNavShow = false;

    };

    $scope.deleteCertificate = function(certificate) {

        var i = $scope.education.certificates.indexOf(certificate);
        if(i != -1) {
            $scope.education.certificates.splice(i, 1);
        }

        $scope.saveCertificatesLocalStorage();
    };




});






educationApp.controller('highSchoolController', function($scope) {

    // check if Name field populated (Save button disabled until)
    $scope.isNamePopulated = function() {
        return ($scope.highSchool.name.length);
    }

    // Save into localStorage and close form
    $scope.saveHighSchool = function(){

        $scope.highSchool.add = false;
        $scope.highSchool.edit = false;
        $scope.saveFn();
        $scope.closeform();

    }


    $scope.cancelHighSchool = function(){
        $scope.resetFn();
        $scope.closeform();
    }


});






educationApp.controller('addCollegeController', function($scope) {

    $scope.saveCollege = function(){

        //restoreOldHighSchool();

        $scope.college.add = false;
        $scope.college.edit = false;
        //localStorage.setItem('resume.education.colleges', JSON.stringify($scope.education.colleges));
        $scope.saveFn();
        $scope.closeform();
    }


    $scope.cancelCollege = function(){


        // remove new college
//        var i = $scope.education.colleges.indexOf($scope.college);
//        if(i != -1) {
//            $scope.education.colleges.splice(i, 1);
//        }

        $scope.resetFn();
        $scope.closeform();
    }

});


educationApp.controller('editCollegeController', function($scope) {
    $scope.saveCollege = function(){


        $scope.college.add = false;
        $scope.college.edit = false;
        //localStorage.setItem('resume.education.colleges', JSON.stringify($scope.education.colleges));
        $scope.saveFn();
        $scope.closeform();

    }


    $scope.cancelCollege = function(){

        //$scope.college.add = false;
        //$scope.college.edit = false;
        $scope.resetFn();
        $scope.closeform();
    }

});







educationApp.controller('addCertificateController', function($scope) {


    $scope.saveCertificate = function(){

        //restoreOldHighSchool();

        $scope.certificate.add = false;
        $scope.certificate.edit = false;
        //localStorage.setItem('resume.education.certificates', JSON.stringify($scope.education.certificates));
        $scope.saveFn();
        $scope.closeform();
    }


    $scope.cancelCertificate = function(){


        // remove new certificate

//        var i = $scope.education.certificates.indexOf($scope.certificate);
//        if(i != -1) {
//            $scope.education.certificates.splice(i, 1);
//        }

        $scope.resetFn();
        // hide forms and show Nav
        $scope.closeform();
    }




});






educationApp.controller('editCertificateController', function($scope) {


    $scope.saveCertificate = function(){

        //restoreOldHighSchool();

        $scope.certificate.add = false;
        $scope.certificate.edit = false;
        //localStorage.setItem('resume.education.certificates', JSON.stringify($scope.education.certificates));
        $scope.saveFn();
        $scope.closeform();
    }


    $scope.cancelCertificate = function(){


        // re-set Certificate array
        $scope.resetFn();
        // hide forms and show Nav
        $scope.closeform();
    }




});


educationApp.directive('highSchoolForm', [function($compile) {
    return {
        restrict: 'E',
        scope: {
            highSchool: "=passedModel",
            //highSchools: "=passedArray",
            saveFn: "&",
            resetFn: "&",
            closeform: "&"
        },
        controller: 'highSchoolController',
        templateUrl: "HTMLControls/Education/highSchoolForm.html"
    }
}]);



educationApp.directive('collegeFormEdit', [function() {
    return {
        restrict: 'E',
        scope: {
            college: "=passedModel",
            closeform: "&",
            saveFn: "&",
            resetFn: "&"

        },
        controller: 'editCollegeController',
        templateUrl: "HTMLControls/Education/collegeForm.html"
    }


}]);



educationApp.directive('collegeFormAdd', [function() {
    return {
        restrict: 'E',
        scope: {
            college: "=passedModel",
            saveFn: "&",
            resetFn: "&",
            closeform: "&"

        },
        controller: 'addCollegeController',
        templateUrl: "HTMLControls/Education/collegeForm.html"
    }


}]);



educationApp.directive('certificateFormAdd', [function() {
    return {
        restrict: 'E',
        scope: {
            certificate: "=passedModel",
            closeform: "&",
            saveFn: "&",
            resetFn: "&"

        },
        controller: 'addCertificateController',
        templateUrl: "HTMLControls/Education/certificationForm.html"
    }


}]);


educationApp.directive('certificateFormEdit', [function() {
    return {
        restrict: 'E',
        scope: {
            certificate: "=passedModel",
            closeform: "&",
            saveFn: "&",
            resetFn: "&"

        },
        controller: 'editCertificateController',
        templateUrl: "HTMLControls/Education/certificationForm.html"
    }


}]);



educationApp.directive('degreeDropDown', [function() {
    return {
        restrict: 'E',
        scope: {
          passedModel: "="
        },
        templateUrl: "HTMLControls/Education/degreeDropDown.html"


    }


}]);

