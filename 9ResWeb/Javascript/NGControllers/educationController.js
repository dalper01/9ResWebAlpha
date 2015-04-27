
var educationApp = angular.module('educationApp', ['commonDirectives', 'navBarApp', 'storageServiceApp']);

educationApp.controller('educationController', function ($scope, $rootScope, localStorageService) {

    // Universal LocalStorage Getter
    function getEducationLocalStorage() {
        $scope.education = localStorageService.GetEducation();
    };

    // Education LocalStorage Saver
    $scope.SaveEducationLocalStorage = function () {
        localStorageService.SaveStorageEducation();
        $scope.serializedEducation = JSON.stringify($scope.education);
    };

    // Education LocalStorage Saver
    $scope.SerializeEducationLocalStorage = function () {
        $scope.serializedEducation = JSON.stringify($scope.education);
    };

    // Reset Education; load from storage to service and pass to local
    $scope.resetEducation = function () {
        $scope.education = JSON.parse($scope.serializedEducation);
    }

    // Confirm Changes to Education
    $scope.saveEducation = function (highschool) {
        $scope.SaveEducationLocalStorage();
        $scope.closeEdit();
    };

    // activate Add/Edit Forms
    $scope.addHighSchool = function () {
        var highschool = {
            add: true,
            edType: 1
        };

        $scope.education.highSchools.push(highschool);
        $scope.EditList.push(highschool);
    };


    $scope.closeEdit = function () {
        $scope.EditList.length = 0;
    };


    $scope.cancelAddHighSchool = function (highSchool) {
        $scope.deleteHighSchool(highSchool);
        $scope.closeEdit();
    };


    $scope.editHighSchool = function (highSchool) {

        $scope.SerializeEducationLocalStorage();
        highSchool.add = false;
        highSchool.edit = true;
        highSchool.edType = 1;
        $scope.EditList.push(highSchool);

        //$scope.EditList.push(highSchool);
    };


    $scope.deleteHighSchool = function(highSchool) {

        var i = $scope.education.highSchools.indexOf(highSchool);
        console.log('index:' + i);
        console.log(highSchool);
        if (i != -1) {
            $scope.education.highSchools.splice(i, 1);
        }

        $scope.SaveEducationLocalStorage();
    };



    $scope.addCollege = function() {

        var college = {
            add: true,
            edType: 2
        };

        $scope.education.colleges.push(college);
        $scope.EditList.push(college);

    };

    $scope.editCollege = function(college) {

        $scope.SerializeEducationLocalStorage();
        college.add = false;
        college.edType = 2;
        college.edit = true;
        $scope.EditList.push(college);


    };

    $scope.cancelAddCollege = function (College) {
        $scope.deleteCollege(College);
        $scope.closeEdit();
    };


    $scope.deleteCollege = function(college) {

        var i = $scope.education.colleges.indexOf(college);
        if(i != -1) {
            $scope.education.colleges.splice(i, 1);
        }
        $scope.SaveEducationLocalStorage();
    };


    $scope.addCertificate = function() {

        var certificate = {
            add: true,
            edType: 3
        };

        $scope.education.certificates.push(certificate);
        $scope.EditList.push(certificate);
    };


    $scope.editCertificate = function(certificate) {

        $scope.SerializeEducationLocalStorage();
        certificate.add = false;
        certificate.edType = 3;
        certificate.edit = true;
        $scope.EditList.push(certificate);
    };

    $scope.cancelAddCertificate = function (certificate) {
        $scope.deleteCertificate(certificate);
        $scope.closeEdit();
    };


    $scope.deleteCertificate = function (certificate) {

        var i = $scope.education.certificates.indexOf(certificate);
        if(i != -1) {
            $scope.education.certificates.splice(i, 1);
        }

        $scope.SaveEducationLocalStorage();
    };

    $scope.SaveNewResume = function () {
        localStorageService.SaveStorageContactInfo();
        $rootScope.$broadcast('openSaveResume');
    }

    // -------------- initialize $scope Model --------------------- //

    getEducationLocalStorage();

    $scope.serializedEducation = '';
    $scope.EditList = [];


    $scope.highschoolEditList = [];
    $scope.collegeEditList = [];
    $scope.certEditList = [];


});





// ------------------------------ highSchoolController ----------------------------------
educationApp.controller('highSchoolController', function($scope) {


    $scope.Title = "Edit High School"



    // check if Name field populated (Save button disabled until)
    $scope.isNamePopulated = function () {
        if ($scope.highSchool.name == undefined)
            $scope.highSchool.name = '';

        return ($scope.highSchool.name.length);
    }

    // Save into localStorage and close form
    $scope.saveHighSchool = function (highschool) {
        console.log('saveHighSchool');
        $scope.saveFn(highschool);
        $scope.closeform();

    }


    $scope.cancelHighSchool = function () {
        $scope.resetFn();
        $scope.closeform();
    }


});





// ------------------------------ CollegeController ----------------------------------
educationApp.controller('CollegeController', function($scope) {

    $scope.Title = "Add College"


    // check if Name field populated (Save button disabled until)
    $scope.isNamePopulated = function () {
        if ($scope.college.name == undefined)
            $scope.college.name = '';

        return ($scope.college.name.length);
    }

    $scope.saveCollege = function () {

        $scope.saveFn();
        $scope.closeform();
    }


    $scope.cancelCollege = function(){

        $scope.resetFn();
        $scope.closeform();
    }

});


// ------------------------------ editCollegeController ----------------------------------
educationApp.controller('editCollegeController', function($scope) {


    $scope.Title = "Edit College"

    // check if Name field populated (Save button disabled until)
    $scope.isNamePopulated = function () {
        if ($scope.college.name == undefined)
            $scope.college.name = '';

        return ($scope.college.name.length);
    }



    $scope.saveCollege = function () {


        $scope.college.add = false;
        $scope.college.edit = false;
        //localStorage.setItem('resume.education.colleges', JSON.stringify($scope.education.colleges));
        $scope.saveFn();
        $scope.closeform();

    }


    $scope.cancelCollege = function(){
        $scope.resetFn();
        $scope.closeform();
    }

});







// ------------------------------ addCertificateController ----------------------------------
educationApp.controller('addCertificateController', function ($scope) {

    $scope.Title = "Add Certification";

    $scope.saveCertificate = function(){

        $scope.saveFn();
        $scope.closeform();
    }


    $scope.cancelCertificate = function(){

        $scope.resetFn();
        $scope.closeform();
    }




});





// ------------------------------ editCertificateController ----------------------------------

educationApp.controller('editCertificateController', function($scope) {

    $scope.Title = "Edit Certification";

    $scope.saveCertificate = function(){

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




// ------------------------------ Directives ----------------------------------


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
        templateUrl: "/HTMLControls/Education/highSchoolForm.html"
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
        templateUrl: "/HTMLControls/Education/collegeForm.html"
    }


}]);



educationApp.directive('collegeForm', [function() {
    return {
        restrict: 'E',
        scope: {
            college: "=passedModel",
            saveFn: "&",
            resetFn: "&",
            closeform: "&"

        },
        controller: 'CollegeController',
        templateUrl: "/HTMLControls/Education/collegeForm.html"
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
        templateUrl: "/HTMLControls/Education/certificationForm.html"
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
        templateUrl: "/HTMLControls/Education/certificationForm.html"
    }


}]);



educationApp.directive('degreeDropDown', [function() {
    return {
        restrict: 'E',
        scope: {
          passedModel: "="
        },
        templateUrl: "/HTMLControls/Education/degreeDropDown.html"


    }


}]);

