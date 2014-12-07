
CareerModule.directive('showJob', [function ($compile) {
    return {
        restrict: "AE",
        //require: "CareerController",
        scope: {
            job: '=',
        },
        controller: "editJobCtrl",
        templateUrl: "/HTMLControls/Careers/showJob.html"
    }


}]);

