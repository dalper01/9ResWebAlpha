
CareerModule.directive('showJob', [function ($compile) {
    return {
        restrict: "AE",
        //require: "CareerController",
        scope: {
            job: '=',
            jobs: '='
        },
        controller: "editJobCtrl",
        templateUrl: "/HTMLControls/Careers/showJob.html"
    }


}]);


CareerModule.directive('addJob', [function ($compile) {
    return {
        restrict: "AE",
        //require: "CareerController",
        scope: {
            job: '=',
            jobs: '=',
            newjobs: '='
        },
        controller: "addJobCtrl",
        templateUrl: "/HTMLControls/Careers/showJob.html"
    }


}]);

