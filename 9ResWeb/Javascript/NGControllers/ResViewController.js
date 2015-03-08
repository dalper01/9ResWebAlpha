
ResumeBuilderModule.controller('ResViewController',
function ($http, $scope, $rootScope, localStorageService) {

    $scope.contactInfo = localStorageService.GetContactInfo();
    $scope.jobs = localStorageService.GetJobs();
    $scope.education = localStorageService.GetEducation();
    $scope.skillSetList = localStorageService.GetSkills();
    $scope.objectiveList = localStorageService.GetObjectives();
});