var ResumeViewModule = angular.module('ResumeViewApp', ['storageServiceApp', 'ui.bootstrap', 'commonDirectives', 'AuthenticationModule', 'ngAnimate']);



ResumeViewModule.controller('ResumeViewerController',
function ($http, $scope, $rootScope, $filter, localStorageService) {

    $scope.contactInfo = localStorageService.GetContactInfo();
    $scope.jobs = localStorageService.GetJobs();
    $scope.education = localStorageService.GetEducation();
    var skillSetList = localStorageService.GetSkills();
    $scope.skillSetList = $filter('filter')(skillSetList, { isActive: true });
    $scope.objectiveList = localStorageService.GetObjectives();

    var elementHandler = {
        '#ignorePDF': function (element, renderer) {
            return true;
        }
    };


    $scope.SaveNewResume = function () {

        localStorageService.SaveStorageContactInfo();
        $rootScope.$broadcast('openSaveResume');

        //alert(1);
        return;
    }

    $scope.SavePDF = function () {

        var json = JSON.stringify({
            contactInfo: localStorageService.GetContactInfo(),
            education: localStorageService.GetEducation(),
            jobs: localStorageService.GetJobs(),
            skills: localStorageService.GetSkills(),
            objectives: localStorageService.GetObjectives()
        });


        $http({
            url: '/api/getResumePDF',
            method: "POST",
            data: json, //this is your json data string
            headers: {
                'Content-type': 'application/json'
            },
            responseType: 'arraybuffer'
        }).success(function (data, status, headers, config) {
            var blob = new Blob([data], { type: "application/pdf" });
            saveAs(blob, 'Resume.pdf');

        }).error(function (data, status, headers, config) {
            //upload failed
        });


        return;

        //var docDefinition = {
        //    content: [

        //        {
        //            text: $scope.contactInfo.firstName + ' ' + $scope.contactInfo.middleName + ' ' + $scope.contactInfo.lastName + ' ',
        //            fontSize: 15,
        //            bold: true,
        //            alignment: 'center',
        //            color: "#285EA6"
        //        }

        //    ]
        //};
        //pdfMake.createPdf(docDefinition).open();


        ////var doc = new jsPDF('p', 'pt', 'letter');
        ////doc.setFontSize(14);
        ////doc.text(1, 1, $scope.contactInfo.firstName + ' ' + $scope.contactInfo.middleName + ' ' + $scope.contactInfo.lastName + ' ');

        ////var htmlPDF = '';

        ////htmlPDF += '<p style="border-bottom: solid #dddddd 1px; font-size: 17px; color: red; text-align: center; width: 100%; text-decoration: underline;"> <span style=" font-family: Gabriola; color: red; font-color: red; font-weight: bold; border-bottom: solid black 1px;">';
        ////htmlPDF += $scope.contactInfo.firstName + ' ' + $scope.contactInfo.middleName + ' ' + $scope.contactInfo.lastName + '</span></p> ';
        ////htmlPDF += '<p style="border-bottom: solid #dddddd 1px; color: red; text-align: center; width: 100%; text-decoration: underline;"> <span style="font-size: 11px; color: red; font-color: red; font-weight: bold; border-bottom: solid black 1px;">';
        ////htmlPDF += $scope.contactInfo.addrStreet + ' ' + $scope.contactInfo.addrTown + ' ' + $scope.contactInfo.addrState + ' ' + $scope.contactInfo.addrZip + '</span></p> <br>';
        ////htmlPDF += '<p style=" left: 1px; position: relative; font-size: 11px; text-color: purple; text-align: center; width: 100%">' + $scope.contactInfo.addrStreet + ' ' + $scope.contactInfo.addrTown + ' ' + $scope.contactInfo.addrState + ' ' + $scope.contactInfo.addrZip + '</p>';
        ////htmlPDF += '<span style="font-size: 11px; text-color: purple; text-align: center">' + $scope.contactInfo.addrStreet + ' ' + $scope.contactInfo.addrTown + ' ' + $scope.contactInfo.addrState + ' ' + $scope.contactInfo.addrZip + '</span>';

        ////var index = 0;
        ////for (index = 0; index < $scope.objectiveList.length; index++) {
        ////    htmlPDF += 'p' + $scope.objectiveList[index].description + '</p>';
        ////}
        ////htmlPDF += '<ul> <li>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa <br>';
        ////htmlPDF += '<li> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </p>';
        ////htmlPDF += '<li>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa <br>';
        ////htmlPDF += '<li>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </ul>';


        ////doc.fromHTML(htmlPDF,
        ////    1, 10, { width: 1000 });
        ////doc.save('sample-file.pdf');



        //return;

        ////doc.fromHTML(source, 10, 10, {
        ////    'width': 170,
        ////    'elementHandlers': elementHandler
        ////});

    };

    $scope.SaveDOC = function () {

        var json = JSON.stringify({
            contactInfo: localStorageService.GetContactInfo(),
            education: localStorageService.GetEducation(),
            jobs: localStorageService.GetJobs(),
            skills: localStorageService.GetSkills(),
            objectives: localStorageService.GetObjectives()
        });


        $http({
            url: '/api/getResumeDOC',
            method: "POST",
            data: json, //this is your json data string
            headers: {
                'Content-type': 'application/json'
            },
            responseType: 'arraybuffer'
        }).success(function (data, status, headers, config) {
            var blob = new Blob([data], { type: "application/msword" });
            saveAs(blob, 'Resume.docx');
        }).error(function (data, status, headers, config) {
            //upload failed
        });
    };

});


ResumeViewModule.directive('resumeViewer', [function ($scope) {

    return {
        restrict: "EA",
        scope: {},
        templateUrl: "/HTMLTemplates/ResumeBuilder/ResView.html",
        controller: 'ResumeViewerController'

    };

}]);
