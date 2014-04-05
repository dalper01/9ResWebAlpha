
var navBarApp = angular.module('navBarApp', []);




navBarApp.directive('resumeBuilderTabsCommon', [function($compile) {
    return {
        restrict: "E",
        controller: 'navController',
        scope: {
            settab: '=',
            updateFn: '&'
        },

        //require: "navController",
        //scope: { active: '='},
        templateUrl: "HTMLControls/navTabsCommon.html"
    }


}]);



navBarApp.controller('navController',
    function ($scope) {

        $scope.navTabs = [
            {
                tabTitle: "Contact Info",
                tabClass: "",
                tabLink: "contact_info.htm"

            },

            {
                tabTitle: "Career Experience",
                tabClass: "",
                tabLink: "career.htm"

            },

            {
                tabTitle: "Education",
                tabClass: "",
                tabLink: "education.htm"

            },

            {
                tabTitle: "Expertise",
                tabClass: "",
                tabLink: "expertise.htm"

            },

            {
                tabTitle: "Objective",
                tabClass: "",
                tabLink: "objective.htm"

            }


        ]

        if ($scope.settab!=null)
        {
            $scope.navTabs[$scope.settab].tabClass="active";
            $scope.navTabs[$scope.settab].tabLink="#";

        }


        //alert('navController ' + $scope.settab);


    });
