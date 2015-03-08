
ResumeBuilderModule.controller('expertiseController', function ($http, $scope, $rootScope, localStorageService) {

    //$scope.skillSetList = [];
    $scope.skillSetList = localStorageService.GetSkills();
    $scope.editSkillSetList = [];
    $scope.addSkillSetList = [];
    $scope.newSkillSet = {
        Title: 'Skills:',
        Skills: [{ Title: 'Typing Fast' }]

    }

    $scope.SaveAddSkills = function () {
        console.log($scope.newSkillSet);
        $scope.skillSetList.push($scope.newSkillSet);
        $scope.newSkillSet = {
            Title: 'Skills:',
            Skills: [{ Title: 'Typing Fast' }]
        };


    };

    $scope.EditSkillSet = function (skillSet) {
        //console.log('editSkillSetList:' + $scope.editSkillSetList.length);
        //console.log('addSkillSetList:' + $scope.addSkillSetList.length);

        // If in already Edit Mode, Don't add more edit boxes
        if ($scope.editSkillSetList.length > 0 || $scope.addSkillSetList.length > 0) {
            alert('already editing');
            return;
        }

        $scope.editSkillSetList.push(skillSet);
        $scope.cancelSkillSet = JSON.stringify($scope.skillSetList);
    };

    $scope.AddSkillSet = function () {
        // If in already Edit Mode, Don't add more edit boxes
        if ($scope.editSkillSetList.length > 0 || $scope.addSkillSetList.length > 0) {
            alert('already editing');
            return;
        }

        $scope.newSkillSet = {
            Title: 'Skills',
            Skills: [{ Title: 'Typing Fast' }]
        };
        $scope.addSkillSetList.push($scope.newSkillSet);
    };

    $scope.CloseAddSkillSet = function (skillSet) {
        $scope.addSkillSetList.length = 0;
    }

    $scope.CloseEditSkillSet = function (skillSet) {
        $scope.editSkillSetList.length = 0;
    }

    $scope.CancelEditSkillSet = function (skillSet) {
        $scope.skillSetList = JSON.parse($scope.cancelSkillSet);
    }



    $scope.DeleteSkill = function (skill) {
        console.log('DeleteSkill');
        deleteArrayElement($scope.SkillList, skill);
        localStorageService.SaveStorageSkills();
    }



    // If Skillset is empty, add opening Skill set to list
    if ($scope.skillSetList.length < 1)
        $scope.AddSkillSet();




});

