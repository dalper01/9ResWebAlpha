// AuthenticationModule Directives

AuthenticationModule.directive('nrLogin', [function ($scope, $compile) {



    return {
        restrict: "E",
        templateUrl: "/HTMLControls/Authentication/nrLogin.html"
    }


}]);

AuthenticationModule.directive('headerLogin', [function ($scope, $compile) {



    return {
        restrict: "E",
        templateUrl: "/HTMLControls/Authentication/headerLogin.html"
    }


}]);
