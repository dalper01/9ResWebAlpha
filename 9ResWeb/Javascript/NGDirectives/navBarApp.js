
var navBarApp = angular.module('navBarApp', []);




//navBarApp.directive('resumeBuilderTabsCommon', [function ($compile) {
//    return {
//        restrict: "E",
//        controller: 'navController',
//        scope: {
//            settab: '=',
//            updateFn: '&'
//        },

//        //require: "navController",
//        //scope: { active: '='},
//        templateUrl: "/HTMLControls/navTabsCommon.html"
//    }


//}]);




navBarApp.directive('resumeBuilderNav', [function ($compile) {
    return {
        restrict: "E",
        controller: 'navController',
        scope: {
            settab: '=',
            updateFn: '&'
        },

        templateUrl: "/HTMLControls/navResumeBuilder.html"
    }


}]);



navBarApp.controller('navController',
    function ($scope) {

        $scope.navTabs = [
            {
                tabId: 1,
                tabTitle: "Contact Info",
                tabClass: ".nav .nav-tabs",
                tabLink: "#/"

            },

            {
                tabId: 2,
                tabTitle: "Career Experience",
                tabClass: ".nav .nav-tabs",
                tabLink: "#/careers"

            },

            {
                tabId: 3,
                tabTitle: "Education",
                tabClass: ".nav .nav-tabs",
                tabLink: "#/education"

            },

            {
                tabId: 4,
                tabTitle: "Expertise",
                tabClass: ".nav .nav-tabs",
                tabLink: "#/expertise"

            },

            {
                tabId: 5,
                tabTitle: "Objective",
                tabClass: ".nav .nav-tabs",
                tabLink: "#/objective"

            }

            //,

            //{
            //    tabTitle: "View Resume",
            //    tabClass: "",
            //    tabLink: "#/resview"

            //}


        ]

        //if ($scope.settab!=null)
        //{
        //    $scope.navTabs[$scope.settab].tabClass="active";
        //    $scope.navTabs[$scope.settab].tabLink="#";

        //}


        //alert('navController ' + $scope.settab);


    });
