
CareerModule.directive('showJob', [function ($compile) {
    return {
        restrict: "AE",
        //require: "CareerController",
        scope: {
            job: '=',
            jobs: '=',
            newjobs: '=',
            jobNumber: '='
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
            newjobs: '=',
            jobNumber: '='
    },
        controller: "addJobCtrl",
        templateUrl: "/HTMLControls/Careers/addJob.html"
    }


}]);

