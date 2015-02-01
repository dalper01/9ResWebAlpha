
var navBarApp = angular.module('navBarApp', []);




navBarApp.directive('resumeBuilderTabsCommon', [function ($compile) {
    return {
        restrict: "E",
        controller: 'navController',
        scope: {
            settab: '=',
            updateFn: '&'
        },

        //require: "navController",
        //scope: { active: '='},
        templateUrl: "/HTMLControls/navTabsCommon.html"
    }


}]);




navBarApp.directive('resumeBuilderNav', [function ($compile) {
    return {
        restrict: "E",
        controller: 'navController',
        scope: {
            settab: '=',
            updateFn: '&'
        },

        //require: "navController",
        //scope: { active: '='},
        templateUrl: "/HTMLControls/navResumeBuilder.html"
    }


}]);



navBarApp.controller('navController',
    function ($scope) {

        $scope.navTabs = [
            {
                tabTitle: "Contact Info",
                tabClass: "",
                tabLink: "#/"

            },

            {
                tabTitle: "Career Experience",
                tabClass: "",
                tabLink: "#/careers"

            },

            {
                tabTitle: "Education",
                tabClass: "",
                tabLink: "#/education"

            },

            {
                tabTitle: "Expertise",
                tabClass: "",
                tabLink: "#/expertise"

            },

            {
                tabTitle: "Objective",
                tabClass: "",
                tabLink: "#/objective"

            },

            {
                tabTitle: "View Resume",
                tabClass: "",
                tabLink: "#/resview"

            }


        ]

        if ($scope.settab!=null)
        {
            $scope.navTabs[$scope.settab].tabClass="active";
            $scope.navTabs[$scope.settab].tabLink="#";

        }


        //alert('navController ' + $scope.settab);


    });
