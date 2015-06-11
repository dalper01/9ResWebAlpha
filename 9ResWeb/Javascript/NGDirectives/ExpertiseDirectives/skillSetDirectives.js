ResumeBuilderModule.directive('addSkillSet', [function () {

    return {
        restrict: "A",
        scope: {
            'skillSet': '=',
            'closeFunc': '&',
            'skillSetList': '='
        },
        controller: 'addSkillSetCntrl',
        templateUrl: "/HTMLControls/Expertise/editSkillSet.html"
    }
}]);


ResumeBuilderModule.directive('editSkillSet', [function () {

    return {
        restrict: "A",
        scope: {
            'skillSet': '=',
            'saveFunc': '&',
            'closeFunc': '&',
            'cancelFunc': '&',
            'skillSetList': '='
        },
        controller: 'editSkillSetCntrl',
        templateUrl: "/HTMLControls/Expertise/editSkillSet.html"
    }
}]);


ResumeBuilderModule.controller('addSkillSetCntrl', function ($scope, localStorageService) {

    $scope.FormTitle = 'New Skill Set';
    $scope.AddSkill = function (SkillSet) {
        SkillSet.Skills.push({
            Title: '',
            Description: '',
            isActive: true
        });
    }

    $scope.CancelSkillSet = function (SkillSet) {
        $scope.closeFunc();
    }

    $scope.SaveSkillSet = function (SkillSet) {
        $scope.closeFunc();
        $scope.skillSetList.push(SkillSet);
        localStorageService.SaveStorageSkills();

    }

});

ResumeBuilderModule.controller('editSkillSetCntrl', function ($scope, localStorageService) {

    $scope.FormTitle = 'Edit Skill Set';
    $scope.AddSkill = function (SkillSet) {
        SkillSet.Skills.push({
            Title: '',
            Description: '',
            isActive: true
        });
        //localStorageService.SaveStorageSkills();
    }

    $scope.deleteSkill = function (skill) {
        //alert('delete');
        skill.isActive = false;
    }


    $scope.CancelSkillSet = function (SkillSet) {
        $scope.closeFunc();
        $scope.cancelFunc();
    }

    $scope.SaveSkillSet = function (SkillSet) {
        localStorageService.SaveStorageSkills();
        $scope.closeFunc();
    }

});