/// <reference path="C:\Users\dave\Documents\GitHub\9ResWebAlpha\9ResWeb\HTMLControls/Objectives/addObjective.html" />
ResumeBuilderModule.directive('addObjective', [function () {
    return {
        restrict: "AE",
        //require: "CareerController",
        //scope: {
        //    job: '=',
        //    jobs: '=',
        //    newjobs: '=',
        //    jobNumber: '='
        //},
        //controller: "editJobCtrl",
        templateUrl: "/HTMLControls/Objectives/addObjective.html"
    }


}]);


ResumeBuilderModule.directive('editObjective', [function () {
    return {
        restrict: "AE",
        //require: "CareerController",
        scope: {
            objective: '=',
            objectiveList: '=',
            //newjobs: '=',
            objectiveNumber: '='
        },
        controller: "editObjectiveCtrl",
        templateUrl: "/HTMLControls/Objectives/editObjective.html"
    }


}]);


ResumeBuilderModule.controller('editObjectiveCtrl', function ($scope, localStorageService) {

    var oldObjective = JSON.stringify($scope.objective);



    $scope.CancelObjective = function () {
        //alert('cancel');
        angular.copy(JSON.parse(oldObjective), $scope.objective)
        //$scope.newObjective = null;
    }

    $scope.SaveObjective = function () {
        //console.log('SaveObjective');
        $scope.objective.edit = false;
        localStorageService.SaveLocalStorageObjectives();
    }


    //$scope.NewObjective();
});