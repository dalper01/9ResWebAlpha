ResumeBuilderModule.directive('saveResume', [function () {

    var saveResumeController = function ($scope, $http, localStorageService) {
        $scope.SaveResumePopup = false;
        $scope.saveAlerts = [];

        $scope.closeAlert = function (index) {
            $scope.saveAlerts.splice(index, 1);
        };

        $scope.$on('openSaveResume', function (event, data) {
            $scope.showSaveResume = true;
            $scope.showDismiss = false;
            $scope.saveAlerts = [];
        });

        $scope.HideSaveResume = function() {
            $scope.showSaveResume = false;
        };

        $scope.saveResume = function () {

            //$scope.showDismiss = true;
            //$scope.saveAlerts.push({
            //    type: 'info',
            //    msg: 'Resume successfully saved'
            //});

            //$scope.saveAlerts.push({
            //    type: 'danger',
            //    msg: 'Error saving resume'
            //});

            //$scope.saveAlerts.push({
            //    type: 'success',
            //    msg: 'Resume successfully saved'
            //});

            //return;
            //$scope.showSaveResume = false;

            //alert(1);
            $http.post("/api/ResumeApi", {
                contactInfo: localStorageService.GetContactInfo(),
                education: localStorageService.GetEducation(),
                jobs: localStorageService.GetJobs(),
                skills: localStorageService.GetSkills(),
                objectives: localStorageService.GetObjectives()
            }).
                success(function (data, status, headers, config) {

                    console.log(data);

                    localStorageService.SetContactInfo(data.contactInfo);
                    localStorageService.SaveStorageContactInfo();

                    localStorageService.SetEducation(data.education);
                    localStorageService.SaveStorageEducation();

                    localStorageService.SetJobs(data.jobs);
                    localStorageService.SaveStorageJobs();

                    localStorageService.SetSkills(data.skills);
                    localStorageService.SaveStorageSkills();

                    localStorageService.SetObjectives(data.objectives);
                    localStorageService.SaveLocalStorageObjectives();

                    $scope.showDismiss = true;
                    $scope.saveAlerts.push({
                        type: 'success',
                        msg: 'Resume successfully saved'
                    });

                    //$scope.showSaveResume = false;

                }).
                    error(function (data, status) {
                        $scope.saveAlerts.push({
                            type: 'danger',
                            msg: 'Error saving resume'
                        });

                        console.log(data); // $scope.data = data || "Request failed";
                        console.log(status); // $scope.data = data || "Request failed";
                    });
        };
    }

    return {
        restrict: "EA",
        scope: {
            //showSaveResume: '='
        },
        templateUrl: "/HTMLControls/SaveLoad/SaveResumePopup.html",
        controller: saveResumeController

    }

}]);