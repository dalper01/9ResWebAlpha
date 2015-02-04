



//// modalAddJobCtrl
//// manage Add Job Popup Callbacks

//var modalAddJobCtrl = function ($scope, localStorageService, $modalInstance, jobs) {

//    $scope.modalTitle='Add New Job';
//    $scope.job = {
//        details: [],
//        edit: true
//    };


//    // move clicked job detail up in order
//    $scope.switchDetailOrderUp = function (detail) {
//        moveDetailOrderUp(detail, $scope.job)
//    }


//    // move clicked job detail down in order
//    $scope.switchDetailOrderDown = function(detail){
//        moveDetailOrderDown(detail, $scope.job)
//    }



//    // Add new job detail within Add Job Pop-up
//    $scope.addJobDetail = function (job) {
//        pushJobDetail(job);
//    };


//    // Save job changes within Add Job Pop-up
//    $scope.saveJob = function () {
//        jobs.push($scope.job);
//        //localStorageService.saveLocalStorage("resume.jobs", jobs);
//        localStorageService.SaveStorageJobs();
//        $modalInstance.dismiss('cancel');
//    };

//    $scope.cancel = function () {
//        $modalInstance.dismiss('cancel');

//    };

//    $scope.deleteJobDetail = function(job, detail) {
//        deleteArrayElement(job.details, detail);

//    };
//};






//// modalEditJobCtrl
//// manage Edit Job Popup Callbacks

//var modalEditJobCtrl = function ($scope, localStorageService, $modalInstance, job) {

//    $scope.modalTitle = 'Edit Job';
//    $scope.job = angular.copy(job);



//    // move clicked job detail up in order
//    $scope.switchDetailOrderUp = function (detail) {
//        moveDetailOrderUp(detail, $scope.job)
//    }


//    // move clicked job detail up in order
//    $scope.switchDetailOrderDown = function (detail) {
//        moveDetailOrderDown(detail, $scope.job)
//    }



//    // Add new job Job Detail
//    $scope.addJobDetail = function (job) {
//        pushJobDetail(job);
//    };

//    // Save job changes
//    $scope.saveJob = function () {
//        angular.copy($scope.job, job);
//        localStorageService.SaveStorageJobs();
//        $modalInstance.dismiss('cancel');
//    };

//    $scope.cancel = function () {
//        $modalInstance.dismiss('cancel');
//    };

//    $scope.deleteJobDetail = function (job, detail) {

//        deleteArrayElement(job.details, detail);


//    };

//};




// editJobCtrl
// manage Edit Job mode

var editJobCtrl = function ($scope, localStorageService) {
    $scope.highlight = ' jobediting';

    //$scope.$watch('job.edit', function () {
    //    //console.log('job.edit' + $scope.job.edit);
    //    if ($scope.job.edit == true) {
    //        $scope.highlight = ' jobediting';
    //        console.log('job.edit"' + $scope.highlight);
    //    }
    //    else $scope.highlight = ' jobediting';
    //});

    $scope.EditJob = function (job) {
        job.edit = true;
    };


    $scope.Title = 'Edit Job';
    $scope.originalJob = angular.copy($scope.job);



    // move clicked job detail up in order
    $scope.switchDetailOrderUp = function (detail) {
        moveDetailOrderUp(detail, $scope.job)
    }


    // move clicked job detail up in order
    $scope.switchDetailOrderDown = function (detail) {
        moveDetailOrderDown(detail, $scope.job)
    }



    // Add new job detail within Add Job Pop-up
    $scope.addJobDetail = function (job) {
        pushJobDetail(job);
    };

    // Save job changes within Add Job Pop-up
    $scope.saveJob = function (job) {
        // store changes in originalJob for Cancel
        $scope.originalJob = angular.copy($scope.job);

        job.edit = false;
        localStorageService.SaveStorageJobs();

    };

    $scope.cancel = function (job) {
        angular.copy($scope.originalJob, job);
        job.edit = false;
    };

    $scope.deleteJobDetail = function (job, detail) {

        deleteArrayElement(job.details, detail);

    };

};





var addJobCtrl = function ($scope, localStorageService) {
    $scope.EditJob = function (job) {
        job.edit = true;
    };


    $scope.Title = 'New Job';
    //$scope.job = angular.copy(job);



    // move clicked job detail up in order
    $scope.switchDetailOrderUp = function (detail) {
        moveDetailOrderUp(detail, $scope.job)
    }


    // move clicked job detail up in order
    $scope.switchDetailOrderDown = function (detail) {
        moveDetailOrderDown(detail, $scope.job)
    }



    // Add new job detail within Add Job Pop-up
    $scope.addJobDetail = function (job) {
        pushJobDetail(job);
    };

    // Save job changes within Add Job Pop-up
    $scope.saveJob = function (job) {
        job.edit = false;
        $scope.jobs.push(job);
        deleteArrayElement($scope.newjobs, job);
        localStorageService.SaveStorageJobs();
    };

    $scope.cancel = function (job) {
        job.edit = false;
        deleteArrayElement($scope.newjobs, job);

    };

    $scope.deleteJobDetail = function (job, detail) {

        deleteArrayElement(job.details, detail);

    };

    $scope.EditJob($scope.job);

};







// ************** commonly used functions for job-detail management *****************************************




var maxDetailOrder = function(job){

    var highestOrder=0;

    for (var i = 0; i < job.details.length; i++) {
        if (job.details[i].order > highestOrder) { highestOrder = job.details[i].order}

    }

    return highestOrder + 1;
}


var pushJobDetail = function (job) {
    job.details.push({
        description: '',
        order: maxDetailOrder(job)
    });
};


// Contrary to name, finds next lowest number order (in magnitude), if exists
var getNextHighestDetailOrder = function(order, job){

    var bestMatch = 0;
    var bestDetailMatch = null;

    for (var i = 0; i < job.details.length; i++) {
        if (job.details[i].order < order && job.details[i].order > bestMatch ) {
            bestMatch = job.details[i].order;
            bestDetailMatch = job.details[i];
        }

    }
    //alert(bestMatch);
    return bestDetailMatch;
}

// Contrary to name, finds next greatest number order (in magnitude), if exists
var getNextLowestDetailOrder = function(order, job){

    var bestMatch = maxDetailOrder(job);
    var bestDetailMatch = null;

    for (var i = 0; i < job.details.length; i++) {
        if (job.details[i].order > order && job.details[i].order < bestMatch ) {
            bestMatch = job.details[i].order;
            bestDetailMatch = job.details[i];
        }

    }
    //alert(bestMatch);
    return bestDetailMatch;
}


var moveDetailOrderUp = function(detail, job){

    var bestMatchDetail = getNextHighestDetailOrder(detail.order, job);
    if (bestMatchDetail!=null){
        var temp = bestMatchDetail.order;
        bestMatchDetail.order = detail.order;
        detail.order = temp;

    }
    //alert('best match:' + bestMatch.order)
}

var moveDetailOrderDown = function(detail, job){

    var bestMatchDetail = getNextLowestDetailOrder(detail.order, job);
    if (bestMatchDetail!=null){
        var temp = bestMatchDetail.order;
        bestMatchDetail.order = detail.order;
        detail.order = temp;

    }
    //alert('best match:' + bestMatch.order)
}



var deleteArrayElement = function(array, item) {
    //alert('delete');

    var index = array.indexOf(item);
    if (index > -1) {
        array.splice(index, 1);
    }


};


// **************** end of job-detail management *****************************************


