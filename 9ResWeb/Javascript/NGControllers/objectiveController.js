
ResumeBuilderModule.controller('objectiveController',
function ($scope, localStorageService) {
    $scope.objectiveList = localStorageService.GetObjectives();
    //console.log($scope.objectiveList);

    $scope.NewObjective = function () {
        $scope.newObjective = {description: ''};
    }

    
    $scope.AddObjective = function (Objective) {
        //console.log(Objective);
        $scope.objectiveList.push(Objective);
        localStorageService.SaveLocalStorageObjectives();
        $scope.newObjective = null;
    }

    $scope.SaveObjective = function () {
        console.log('SaveObjective');
        //localStorageService.SaveLocalStorageObjective();
    }

});