//  index Controller
var indexModule = angular.module('indexModule', ['commonDirectives', 'navBarApp', 'AuthenticationModule']);

indexModule.controller('indexController',
    function ($scope, $filter) {

        //$scope.getStartedSrc = '@Url.Content("~/content/images/9resGetStarted_hover.png")';
        $scope.getStartedSrc = "/Content/images/9resGetStarted.png";

        $scope.changeStartImg = function (newlink) {

            $scope.getStartedSrc=newlink;

        }

        $scope.startResume = function() {
            window.location='/ResumeBuilder'
        }


});



