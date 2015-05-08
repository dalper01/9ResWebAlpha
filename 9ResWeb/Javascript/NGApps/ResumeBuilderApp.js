
var ResumeBuilderModule = angular.module('ResumeBuilderModule', ['ngRoute', 'storageServiceApp', 'ui.bootstrap', 'ContactInfoModule', 'CareerModule', 'educationApp', 'AuthenticationModule', 'ngAnimate']);

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
    .when('/expertise', {
        templateUrl: '/HTMLTemplates/ResumeBuilder/Expertise.html',
        controller: 'expertiseController'


    })
    .when('/objective', {
        templateUrl: '/HTMLTemplates/ResumeBuilder/Objective.html',
        controller: 'objectiveController'


    })
    .when('/resview', {
        templateUrl: '/HTMLTemplates/ResumeBuilder/ResView.html',
        controller: 'ResViewController'


    })
    .otherwise({
        redirectTo: '/'
    })

});
