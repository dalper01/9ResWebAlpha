
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

    $scope.CancelObjective = function () {
        $scope.newObjective = null;
    }

    $scope.SaveObjective = function (Objective) {
        console.log('SaveObjective');
        //console.log(Objective);
        $scope.objectiveList.push(Objective);
        localStorageService.SaveLocalStorageObjectives();
        $scope.newObjective = null;
    }

    $scope.ShowEditObjective = function (Objective) {
        console.log('ShowEditObjective');
        Objective.edit = true;
    }

    //$scope.NewObjective();
});