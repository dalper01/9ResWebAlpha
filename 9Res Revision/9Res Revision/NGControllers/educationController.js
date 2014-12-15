
var educationApp = angular.module('educationApp', ['commonDirectives', 'navBarApp', 'storageServiceApp']);

educationApp.controller('educationController', function($scope, localStorageService) {

    // initialize Arrays
    $scope.colleges = [];
    $scope.certificates = [];
    $scope.highSchools = [];
    //$scope.highSchoolEdit = false;
    //$scope.collegeEdit = false;
    //$scope.collegeAdd = false;
    //$scope.certificateEdit = false;
    $scope.addNavShow = true;

    var resetHighSchool = "";



    // if localstorage available
    if(typeof(Storage)!=="undefined")
    {

        getHighSchoolLocalStorage();
        getCollegesLocalStorage();
        getCertificatesLocalStorage();

    };


    function getHighSchoolLocalStorage(){
        $scope.highSchools = localStorageService.getLocalStorage("resume.highSchools") || [];
    };


    function getCollegesLocalStorage(){
        $scope.colleges = localStorageService.getLocalStorage("resume.colleges") || [];
    };


    function getCertificatesLocalStorage(){
        $scope.certificates = localStorageService.getLocalStorage("resume.certificates") || [];
    };





    $scope.saveHighSchoolLocalStorage = function(){
        localStorageService.saveLocalStorage("resume.highSchools", $scope.highSchools);
    };


    $scope.saveCollegesLocalStorage = function(){
        localStorageService.saveLocalStorage("resume.colleges", $scope.colleges);
    };


    $scope.saveCertificatesLocalStorage = function(){
        localStorageService.saveLocalStorage("resume.certificates", $scope.certificates);
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

        $scope.highSchools.push({ add: true});
        $scope.addNavShow = false;
    };

    $scope.editHighSchool = function(highSchool) {

        highSchool.edit = true;
        $scope.addNavShow = false;

    };

    $scope.deleteHighSchool = function(highSchool) {

        var i = $scope.highSchools.indexOf(highSchool);
        if(i != -1) {
            $scope.highSchools.splice(i, 1);
        }

        $scope.saveHighSchoolLocalStorage();
    };





    $scope.addCollege = function() {

        //$scope.collegeAdd = true;
        $scope.colleges.push({ add: true})
        $scope.addNavShow = false;

    };

    $scope.editCollege = function(college) {

        college.edit = true;
        $scope.addNavShow = false;

    };

    $scope.deleteCollege = function(college) {

        var i = $scope.colleges.indexOf(college);
        if(i != -1) {
            $scope.colleges.splice(i, 1);
        }
        $scope.saveCollegesLocalStorage();
    };



    $scope.addCertificate = function() {

        //$scope.certificateAdd = true;
        $scope.certificates.push({ add: true})
        $scope.addNavShow = false;

    };


    $scope.editCertificate = function(certificate) {

        certificate.edit = true;
        $scope.addNavShow = false;

    };

    $scope.deleteCertificate = function(certificate) {

        var i = $scope.certificates.indexOf(certificate);
        if(i != -1) {
            $scope.certificates.splice(i, 1);
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
        //localStorage.setItem('resume.colleges', JSON.stringify($scope.colleges));
        $scope.saveFn();
        $scope.closeform();
    }


    $scope.cancelCollege = function(){


        // remove new college
//        var i = $scope.colleges.indexOf($scope.college);
//        if(i != -1) {
//            $scope.colleges.splice(i, 1);
//        }

        $scope.resetFn();
        $scope.closeform();
    }

});


educationApp.controller('editCollegeController', function($scope) {
    $scope.saveCollege = function(){


        $scope.college.add = false;
        $scope.college.edit = false;
        //localStorage.setItem('resume.colleges', JSON.stringify($scope.colleges));
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
        //localStorage.setItem('resume.certificates', JSON.stringify($scope.certificates));
        $scope.saveFn();
        $scope.closeform();
    }


    $scope.cancelCertificate = function(){


        // remove new certificate

//        var i = $scope.certificates.indexOf($scope.certificate);
//        if(i != -1) {
//            $scope.certificates.splice(i, 1);
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
        //localStorage.setItem('resume.certificates', JSON.stringify($scope.certificates));
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

