
ResumeBuilderModule.controller('ResViewController',
function ($http, $scope, $rootScope, localStorageService) {

    $scope.contactInfo = localStorageService.GetContactInfo();
    $scope.jobs = localStorageService.GetJobs();
    $scope.education = localStorageService.GetEducation();
    $scope.SkillList = localStorageService.GetSkills();
});