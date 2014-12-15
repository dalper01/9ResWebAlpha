//  index Controller
var indexModule = angular.module('indexModule', ['commonDirectives', 'navBarApp']);

indexModule.controller('indexController',
    function ($scope, $filter) {

        $scope.getStartedSrc="images/9resGetStarted.png";

        $scope.changeStartImg = function(newlink){

            $scope.getStartedSrc=newlink;

        }

        $scope.startResume = function() {
            window.location='contact_info.htm'
        }


    });



