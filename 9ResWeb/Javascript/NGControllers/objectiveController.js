
ResumeBuilderModule.controller('objectiveController',
function ($scope, $rootScope, localStorageService) {
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


    $scope.SaveNewResume = function () {

        localStorageService.SaveStorageContactInfo();
        $rootScope.$broadcast('openSaveResume');

        //alert(1);
        return;
    }

    // If Objective is empty, add opening Skill set to list
    //if ($scope.objectiveList.length < 1)
    //    $scope.AddSkillSet();

    //$scope.NewObjective();
});