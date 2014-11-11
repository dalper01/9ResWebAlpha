var AuthenticationModule = angular.module('AuthenticationModule', ['googleplus', 'facebook']);

AuthenticationModule.config(['GooglePlusProvider', 'FacebookProvider', function (GooglePlusProvider, FacebookProvider) {
    GooglePlusProvider.init({
    });
    FacebookProvider.init('1484397018497780');
    //GooglePlusProvider.setScopes('profile email');
}]);


AuthenticationModule.controller('PageController', function ($scope) {

    $scope.showLogin = false;
    $scope.showRegister = false;


    $scope.OpenLogin = function () {
        $scope.showLogin = true;
        $scope.showRegister = false;

    }

    $scope.SwitchRegister = function () {
        $scope.showRegister = true;
        console.log('SwitchRegister');
    }

    $scope.SwitchLogin = function () {
        $scope.showRegister = false;
        console.log('SwitchLogin');

    }

});

