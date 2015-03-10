
var ContactInfoModule = angular.module('ContactInfoModule', ['commonDirectives', 'ui.mask', 'navBarApp', 'storageServiceApp', 'ngAnimate']);



ContactInfoModule.controller('ContactInfoController',
    function ($rootScope, $scope, $http, $filter, localStorageService) {



        // Initialize Contact Info
        $scope.contactInfo = localStorageService.GetContactInfo();

        $scope.ShowInstructions = false;
        $scope.noNameMessage = "Your Name Here";
        $scope.noAddressMessage = "Where You Live";
        $scope.noContactMessage = "Your Contact Info";

        $scope.phoneTypes = [{ name: "Home", id: "(h)" }, { name: "Work", id: "(w)" }, { name: "Mobile", id: "(c)" }];

        $scope.socialMediaTypes = [{ name: "Facebook", img: "./images/icon_facebook.bmp" },
            { name: "LinkedIn", img: "./images/icon_linkedin.bmp" },
            { name: "Skype", img: "./images/icon_skype.bmp" }];



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
        console.log('Saving');

        console.log(localStorageService.GetSkills());
        console.log(localStorageService.GetObjectives());

        //return;

        $http.post("/api/ResumeApi", {
            contactInfo: localStorageService.GetContactInfo(),
            education: localStorageService.GetEducation(),
            jobs: localStorageService.GetJobs(),
            skills: localStorageService.GetSkills(),
            objectives: localStorageService.GetObjectives()
        }).
            success(function (data, status, headers, config) {

                console.log(data);


            });

    }


});