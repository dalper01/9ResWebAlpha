var AuthenticationModule = angular.module('AuthenticationModule', ['googleplus', 'facebook']);

AuthenticationModule.config(['GooglePlusProvider', 'FacebookProvider', function (GooglePlusProvider, FacebookProvider) {
    GooglePlusProvider.init({
    });

    // localhost:44300
    //FacebookProvider.init('1484397018497780');
    // 9res.org
    FacebookProvider.init('286786211517047');
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

