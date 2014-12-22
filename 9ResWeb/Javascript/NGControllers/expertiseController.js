
ResumeBuilderModule.controller('expertiseController',
function ($http, $scope, $rootScope, localStorageService) {
    $scope.SkillList = localStorageService.GetSkills();

    $scope.AddSkill = function(skill) {
        $scope.SkillList.push(skill);
        localStorageService.SaveStorageSkills();
        $scope.Skill = {};
    }

    $scope.DeleteSkill = function (skill) {
        console.log('DeleteSkill');
        deleteArrayElement($scope.SkillList, skill);
        localStorageService.SaveStorageSkills();
    }    
});

