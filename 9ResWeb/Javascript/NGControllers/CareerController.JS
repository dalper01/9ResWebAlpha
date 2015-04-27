
var CareerModule = angular.module('CareerModule', ['ui.bootstrap', 'commonDirectives', 'navBarApp', 'storageServiceApp', 'ngAnimate']);


CareerModule.controller('CareerController',
function ($scope, $rootScope, $modal, localStorageService) {


    old_msg = "";
    chk_msg="";
    //display_jobs('');
    //set_cr_height();


    $scope.EditJob = function (job) {
        job.edit = true;
    };


    $scope.AddJob = function () {


        if ($scope.newJobs.length < 1) {
            $scope.newJobs.push(
                {
                    details: [{
                        description: "",
                        edit: true,
                        order: 1
                    }]
                });
        }
    };

    $scope.SaveNewResume = function () {

        localStorageService.SaveStorageContactInfo();
        $rootScope.$broadcast('openSaveResume');

        //alert(1);
        return;
    }



    $scope.jobs = localStorageService.GetJobs();
    $scope.newJobs = [];

    if ($scope.jobs.length < 1) {
        $scope.AddJob();
    }

    jobArray = $scope.jobs;


});




