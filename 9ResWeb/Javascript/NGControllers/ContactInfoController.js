
var ContactInfoModule = angular.module('ContactInfoModule', ['commonDirectives', 'ui.mask', 'navBarApp', 'storageServiceApp', 'ngAnimate']);



ContactInfoModule.controller('ContactInfoController',
    function ($rootScope, $scope, $http, $filter, localStorageService) {
        $scope.showSaveResume = false;

        $scope.ShowSaveResume = function () {
            //$scope.$parent.showSaveResume = true;
            alert(1);
            $scope.$emit('openSaveResume', [1, 2, 3]);
            $rootScope.$broadcast('openSaveResume');
        }

        $scope.HideSaveResume = function () {
            alert(1);
            $scope.$parent.showSaveResume = false;
        }

        // Declare Contact Info Loader
        $scope.LoadContactInfoLocalStorage = function ()
        {
            $scope.contactInfo = localStorageService.GetContactInfo();
        }
        // Load Contact Info
        $scope.LoadContactInfoLocalStorage();

        $scope.ShowInstructions = false;
        $scope.noNameMessage = "Your Name Here";
        $scope.noAddressMessage = "Where You Live";
        $scope.noContactMessage = "Your Contact Info";

        $scope.phoneTypes = [{ name: "Home", id: "(h)" }, { name: "Work", id: "(w)" }, { name: "Mobile", id: "(c)" }];

        $scope.socialMediaTypes = [{ name: "Facebook", img: "fa-facebook-square" },
            { name: "LinkedIn", img: "fa-linkedin-square" },
            { name: "Skype", img: "fa-skype" }];



        // show / hide empty data functions ----------------
        
        $scope.ShowInstructions = function () {
            $scope.ShowInstructions = true;
        }


        $scope.showNameMessage = function() {
            return ($scope.contactInfo.firstName + $scope.contactInfo.middleName + $scope.contactInfo.lastName).length;
        }

        $scope.showAddressMessage = function() {
            return ($scope.contactInfo.addrStreet + $scope.contactInfo.addrTown + $scope.contactInfo.addrState + $scope.contactInfo.addrZip).length;
        }

        $scope.showContactMessage = function() {
            return ($scope.contactInfo.number1 + $scope.contactInfo.number2 + $scope.contactInfo.eMail + $scope.contactInfo.socialMedia).length;
        }

        $scope.showCommaCityState = function () {
            if (typeof $scope.contactInfo.addrState == "undefined" || typeof $scope.contactInfo.addrTown == "undefined")
                return false;

            return ($scope.contactInfo.addrState.length > 0 && $scope.contactInfo.addrTown.length > 0);
        }




        $scope.saveLocalContact = function () {

            //alert("savingLocal called")
            saveContactInfo();

        }


        // populate ContactInfo from local storage
        var LoadStorageContactInfo = function () {
            localStorageService.getLocalStorage();
        }


    // populate ContactInfo from local storage

        var saveContactInfo = function () {

            // check if HTML 5 local storage supported. Else bail (vernacular)
            //if (typeof (Storage) == "undefined") { return; }
            //localStorageService.saveLocalStorage("resume.contactInfo", $scope.contactInfo);
            localStorageService.SaveStorageContactInfo()
    }

    $scope.SaveNewResume = function () {

        localStorageService.SaveStorageContactInfo();
        //localStorageService.SaveStorageEducation();
        //localStorageService.SaveStorageJobs();
        //localStorageService.SaveStorageSkills();
        //localStorageService.SaveLocalStorageObjectives();

        //console.log('Saving');
        //$scope.$emit('openSaveResume', [1, 2, 3]);
        $rootScope.$broadcast('openSaveResume');

        //alert(1);
        return;



    }


});