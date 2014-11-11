﻿
var ResumeBuilderModule = angular.module('ResumeBuilderModule', ['ngRoute', 'storageServiceApp', 'ContactInfoModule', 'CareerModule', 'educationApp', 'AuthenticationModule']);

ResumeBuilderModule.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/HTMLTemplates/ResumeBuilder/ContactInfo.html',
        controller: 'ContactInfoController'
    })
    .when('/careers', {
        templateUrl: '/HTMLTemplates/ResumeBuilder/Careers.html',
        controller: 'CareerController'


    })
    .when('/education', {
        templateUrl: '/HTMLTemplates/ResumeBuilder/Education.html',
        controller: 'educationController'


    })

    .otherwise({
        redirectTo: '/'
    })

});


ResumeBuilderModule.controller('saveResume',
function ($http, $scope, $rootScope, localStorageService) {

    $scope.newResume = function () {
        //alert('saving!!');

        $http.post("/api/ResumeApi", {
            contactInfo: $rootScope.contactInfo,
            education: $rootScope.education,
            jobs: $rootScope.jobs
        }).
            success(function (data, status, headers, config) {

                console.log(data);


            });


    }

});


//ResumeBuilderModule.$inject = ["$rootScope", "storageServiceApp"];

//ResumeBuilderModule.run(['$rootScope', 'storageServiceApp', function ($rootScope, localStorageService) {
//    $rootScope.resume.contactInfo = localStorageService.getLocalStorage("resume.contactInfo") || {};
//}]);