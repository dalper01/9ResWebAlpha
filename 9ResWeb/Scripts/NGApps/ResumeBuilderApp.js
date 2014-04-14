﻿//var ResumeBuilderModule = angular.module('ResumeBuilderModule', ['commonDirectives', 'ui.mask', 'navBarApp', 'storageServiceApp']);
var ResumeBuilderModule = angular.module('ResumeBuilderModule', ['ngRoute', 'storageServiceApp', 'ContactInfoModule', 'CareerModule', 'educationApp']);

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

}

);

//ResumeBuilderModule.$inject = ["$rootScope", "storageServiceApp"];

//ResumeBuilderModule.run(['$rootScope', 'storageServiceApp', function ($rootScope, localStorageService) {
//    $rootScope.resume.contactInfo = localStorageService.getLocalStorage("resume.contactInfo") || {};
//}]);