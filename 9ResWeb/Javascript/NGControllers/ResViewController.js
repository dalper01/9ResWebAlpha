
ResumeBuilderModule.controller('ResViewController',
function ($http, $scope, $rootScope, localStorageService) {

    $scope.contactInfo = localStorageService.GetContactInfo();
    $scope.jobs = localStorageService.GetJobs();
    $scope.education = localStorageService.GetEducation();
    $scope.skillSetList = localStorageService.GetSkills();
    $scope.objectiveList = localStorageService.GetObjectives();

    var elementHandler = {
        '#ignorePDF': function (element, renderer) {
            return true;
        }
    };

    $scope.SavePDF = function () {

        var doc = new jsPDF('p', 'pt', 'letter');
        doc.setFontSize(14);
        //doc.text(1, 1, $scope.contactInfo.firstName + ' ' + $scope.contactInfo.middleName + ' ' + $scope.contactInfo.lastName + ' ');

        var htmlPDF = '';

        htmlPDF += '<p style="border-bottom: solid #dddddd 1px; font-size: 17px; color: red; text-align: center; width: 100%; text-decoration: underline;"> <span style=" font-family: Gabriola; color: red; font-color: red; font-weight: bold; border-bottom: solid black 1px;">';
        htmlPDF += $scope.contactInfo.firstName + ' ' + $scope.contactInfo.middleName + ' ' + $scope.contactInfo.lastName + '</span></p> ';
        htmlPDF += '<p style="border-bottom: solid #dddddd 1px; color: red; text-align: center; width: 100%; text-decoration: underline;"> <span style="font-size: 11px; color: red; font-color: red; font-weight: bold; border-bottom: solid black 1px;">';
        htmlPDF += $scope.contactInfo.addrStreet + ' ' + $scope.contactInfo.addrTown + ' ' + $scope.contactInfo.addrState + ' ' + $scope.contactInfo.addrZip + '</span></p> <br>';
        //htmlPDF += '<p style=" left: 1px; position: relative; font-size: 11px; text-color: purple; text-align: center; width: 100%">' + $scope.contactInfo.addrStreet + ' ' + $scope.contactInfo.addrTown + ' ' + $scope.contactInfo.addrState + ' ' + $scope.contactInfo.addrZip + '</p>';
        //htmlPDF += '<span style="font-size: 11px; text-color: purple; text-align: center">' + $scope.contactInfo.addrStreet + ' ' + $scope.contactInfo.addrTown + ' ' + $scope.contactInfo.addrState + ' ' + $scope.contactInfo.addrZip + '</span>';

        var index = 0;
        for (index = 0; index < $scope.objectiveList.length; index++) {
            htmlPDF += 'p' + $scope.objectiveList[index].description + '</p>';
        }
        htmlPDF += '<ul> <li>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa <br>';
        htmlPDF += '<li> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </p>';
        htmlPDF += '<li>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa <br>';
        htmlPDF += '<li>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </ul>';


        doc.fromHTML(htmlPDF,
            1, 10, { width: 1000 });
        doc.save('sample-file.pdf');



        //var printDoc = new jsPDF();

        //printDoc.fromHTML($('#prevRes').get(0), 10, 10, {
        //    'width': 180
        //});
        //printDoc.autoPrint()
        //printDoc.output("dataurlnewwindow") // this opens a new popup,  after this the PDF opens the print window view but there are browser inconsistencies with how this is handled

        //printDoc.save('sample-file.pdf');

        //return;


        //  doc.fromHTML($('#prevRes').html(), 15, 15, {
        //      'width': 1000,
        //      'elementHandlers': {
        //          'H1': (el, renderer) =>
        //doc.setFontSize(14)
        //  doc.setFontStyle('bold')
        //  doc.text($(el).text(), 10, renderer.y)
        //  doc.setFontSize(12)
        //  doc.setFontStyle('normal')
        //  true}
        //  });
        //  doc.save('sample-file.pdf');

        //var source = $("#prevRes").innerHTML();
        //console.log(source);

        return;

        doc.fromHTML(source, 10, 10, {
            'width': 170,
            'elementHandlers': elementHandler
            //          'LI': (el, renderer) =>
            //            if renderer.y > 250
            //    doc.addPage()
            //    renderer.y = 10
            //else
            //    renderer.y += 10
            //    false
            //    'H1': (el, renderer) =>
            //      doc.setFontSize(14)
            //    doc.setFontStyle('bold')
            //    doc.text($(el).text(), 10, renderer.y)
            //    doc.setFontSize(12)
            //    doc.setFontStyle('normal')
            //    true
            //    doc.output 'dataurlnewwindow', {}
        });

    };

});