
ResumeBuilderModule.controller('objectiveController',
function ($http, $scope, $rootScope, localStorageService) {
    $scope.Objective = localStorageService.GetObjective();

    $scope.SaveObjective = function () {
        console.log('SaveObjective');
        localStorageService.SaveLocalStorageObjective();
    }

});