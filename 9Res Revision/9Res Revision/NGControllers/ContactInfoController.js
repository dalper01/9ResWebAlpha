
//var ContactInfoModule = angular.module('ContactInfoModule', ['ui.bootstrap', 'commonDirectives']);
var ContactInfoModule = angular.module('ContactInfoModule', ['commonDirectives', 'ui.mask', 'navBarApp', 'storageServiceApp']);



ContactInfoModule.controller('ContactInfoController',
    function ($scope, $filter, localStorageService) {

        $scope.resume = { firstName: "" };



        // show / hide empty data functions ----------------

        $scope.showNameMessage = function() {
            return ($scope.resume.firstName + $scope.resume.middleName + $scope.resume.lastName).length;
        }

        $scope.showAddressMessage = function() {
            return ($scope.resume.addrStreet + $scope.resume.addrTown + $scope.resume.addrState + $scope.resume.addrZip).length;
        }

        $scope.showContactMessage = function() {
            return ($scope.resume.number1 + $scope.resume.number2 + $scope.resume.eMail + $scope.resume.socialMedia).length;
        }

        $scope.showCommaCityState = function () {
            if (typeof $scope.resume.addrState == "undefined" || typeof $scope.resume.addrTown == "undefined")
                return false;

            return ($scope.resume.addrState.length > 0 &&  $scope.resume.addrTown.length > 0);
        }

        $scope.saveLocalContact = function() {

            //alert("savingLocal called")
            saveContactInfo();

        }



    // populate ContactInfo from local storage
    var loadLocalContactInfo = function() {

        if(typeof(Storage)!=="undefined")
        {

            $scope.resume = localStorageService.getLocalStorage("resume.contactinfo") || {};
//            $scope.resume.firstName = localStorage.getItem("resume.firstName") || "";
//            $scope.resume.middleName = localStorage.getItem("resume.middleName") || "";
//            $scope.resume.lastName = localStorage.getItem("resume.lastName") || "";

//            $scope.resume.addrStreet = localStorage.getItem("resume.addrStreet") || "";
//            $scope.resume.addrTown = localStorage.getItem("resume.addrTown") || "";
//            $scope.resume.addrState = localStorage.getItem("resume.addrState") || "";
//            $scope.resume.addrZip = localStorage.getItem("resume.addrZip") || "";

//            $scope.resume.phone1 = localStorage.getItem("resume.phone1") || $scope.phoneTypes[0].id;

////            $scope.number1 = $filter('tel')($scope.number1);
//            $scope.resume.number1 = localStorage.getItem("resume.number1") || "";

//            $scope.resume.phone2 = localStorage.getItem("resume.phone2") || $scope.phoneTypes[1].id;

//            $scope.resume.number2 = localStorage.getItem("resume.number2") || "";
//            $scope.resume.eMail = localStorage.getItem("resume.eMail") || "";
//            $scope.resume.socialMedia = localStorage.getItem("resume.socialMedia") || "";
//            $scope.resume.socialMediaLogo = localStorage.getItem("resume.socialMediaLogo") || $scope.socialMediaTypes[1].img;
        }
        else
        {
            $scope.resume.firstName = localStorage.getItem("resume.firstName") || "";
            $scope.resume.middleName = localStorage.getItem("resume.middleName") || "";
            $scope.lastName = localStorage.getItem("resume.lastName") || "";

            $scope.resume.addrStreet = localStorage.getItem("resume.addrStreet") || "";
            $scope.resume.addrTown = localStorage.getItem("resume.addrTown") || "";
            $scope.resume.addrState = localStorage.getItem("resume.addrState") || "";
            $scope.resume.addrZip = localStorage.getItem("resume.addrZip") || "";

            $scope.resume.phone1 = localStorage.getItem("resume.phone1") || $scope.phoneTypes[0].id;

            //            $scope.number1 = $filter('tel')($scope.number1);
            $scope.resume.number1 = localStorage.getItem("resume.number1") || "";

            $scope.resume.phone2 = localStorage.getItem("resume.phone2") || $scope.phoneTypes[1].id;

            $scope.resume.number2 = localStorage.getItem("resume.number2") || "";
            $scope.resume.eMail = localStorage.getItem("resume.eMail") || "";
            $scope.resume.socialMedia = localStorage.getItem("resume.socialMedia") || "";
            $scope.resume.socialMediaLogo = localStorage.getItem("resume.socialMediaLogo") || $scope.socialMediaTypes[1].img;
        }


    }


    // populate ContactInfo from local storage
    var saveContactInfo = function() {

        // check if HTML 5 local storage supported. Else bail (vernacular)
        if (typeof(Storage)=="undefined") { return;}

        localStorageService.saveLocalStorage("resume.contactinfo", $scope.resume);

        //localStorage.setItem("resume.firstName", $scope.firstName);
        //localStorage.setItem("resume.middleName", $scope.middleName);
        //localStorage.setItem("resume.lastName", $scope.lastName);

        //localStorage.setItem("resume.addrStreet", $scope.addrStreet);
        //localStorage.setItem("resume.addrTown", $scope.addrTown);
        //localStorage.setItem("resume.addrState", $scope.addrState);
        //localStorage.setItem("resume.addrZip", $scope.addrZip);



        //localStorage.setItem("resume.phone1", $scope.phone1);
        //localStorage.setItem("resume.number1", $scope.number1);
        //localStorage.setItem("resume.phone2", $scope.phone2);
        //localStorage.setItem("resume.number2", $scope.number2);


        //localStorage.setItem("resume.eMail", $scope.eMail);
        //localStorage.setItem("resume.socialMedia", $scope.socialMedia);
        //localStorage.setItem("resume.socialMediaLogo", $scope.socialMediaLogo);

    }



    // Initialize Contact Info
    $scope.noNameMessage="Your Name Here";
    $scope.noAddressMessage="Where You Live";
    $scope.noContactMessage="Your Contact Info";




    $scope.phoneTypes = [{ name: "Home", id: "(h)" }, { name: "Work", id: "(w)" }, { name: "Mobile", id: "(c)" }];

    $scope.socialMediaTypes = [{ name: "Facebook", img: "./images/icon_facebook.bmp" },
        { name: "LinkedIn", img: "./images/icon_linkedin.bmp" },
        { name: "Skype", img: "./images/icon_skype.bmp" }];





    loadLocalContactInfo();

});