
var CareerModule = angular.module('CareerModule', ['ui.bootstrap', 'commonDirectives', 'navBarApp', 'storageServiceApp']);


CareerModule.controller('CareerController',
function ($scope, $rootScope, $modal, localStorageService) {

    $scope.jobs = localStorageService.GetJobs();


    jobArray = $scope.jobs;


    old_msg = "";
    chk_msg="";
    display_jobs('');
    set_cr_height();

    //$("input:text, textarea, select").addClass("input_inactive_ob");
    //$("input:text, textarea, select").focus(function(){$(this).addClass("input_active_ob").removeClass("input_inactive_ob");
    //}).blur(function(){$(this).removeClass("input_active_ob").addClass("input_inactive_ob");
    //    });


    $scope.EditJob = function (job) {
        job.edit = true;
    };


    $scope.openAddJob = function () {

         var modalInstance = $modal.open({
            templateUrl: '/HTMLControls/jobModal.html',
            controller: 'modalAddJobCtrl',
            backdrop: 'static',

            resolve: {
                jobs: function() {return $scope.jobs}
            }
        });
    };

    $scope.openEditJob = function (job) {

        var modalInstance = $modal.open({
            templateUrl: '/HTMLControls/jobModal.html',
            controller: 'modalEditJobCtrl',
            backdrop: 'static',
            resolve: {
                job: function() {return job}
            }
        });


    };

    function pop_timelines() {

        // var dt_max_end = new Date();

        var chk_nums = document.getElementById("chk_job_nums").checked;

        jobArray.sort(sort_by_date);
        var x = new Date();
        var jobBlanks = new Array();
        var job_counter =0;

        // Step 1: Get boundary years (current year and 15 years back);
        var x = new Date();
        var max_date = new Date(x.getFullYear(), 0,1,0,0,0,0);
        var min_date = new Date(x.getFullYear() - 15,0,1,0,0,0,0);
        var true_min_date = max_date;

        var htm = "";
        var splice_check;

        //for(var z = 0; z < jobArray.length; z++){ htm = htm + jobArray[z].Start.getMonth() + "-" + jobArray[z].Start.getYear() + " " + jobArray[z].End.getMonth() + "-" + jobArray[z].End.getYear() + " " + jobArray[z].Firm + " " + jobArray[z].Title + "\n";}


        // Step 2: Loop over jobs, cut off anything outside of our min/max, and cleaning up mis-matching dates.
        for(var y = 0; y < jobArray.length; y++) {
            splice_check=0;
            if(jobArray[y].End < min_date) {splice_check=1;}
            else if(jobArray[y].Start < min_date) { jobArray[y].Start = min_date;}

            // Step 2a: if this is the earliest date we've seen (and isn't earlier than our theoretical min date), then remember it
            if(jobArray[y].Start < true_min_date & jobArray[y].Start >= min_date) { true_min_date = jobArray[y].Start;}

            if(jobArray[y].Start > max_date) { splice_check=1;}
            else if(jobArray[y].End > max_date) { jobArray.End = max_date;}

            // Step 2a: if this job is being merged (which is when a person has multiple positions at the same firm, but wants them all as a single value
            // on the timeline), then use the original start date and company, but the latest end date and title.
            if(y > 0 & jobArray[y].Merge =="Y") {
                jobArray[y-1].Title = jobArray[y].Title;
                jobArray[y-1].End = jobArray[y].End;
                splice_check=1;
            }

            // Step 2b: now, remove the current job if necessary -- and if not, then fill in start/end date gaps if less than a month
            if(splice_check==1) { jobArray.splice(y,1); y--;}
            else {
                if(y > 0) {if(jobArray[y-1].End > (jobArray[y].Start - (32*1000*24*60*60))) {jobArray[y-1].End = jobArray[y].Start;}}
            }
        }

        // Step 3: Loop over the jobs again, and insert values for any blanks.  (Including ones at the start and end, if necessary.)

        for(var y = 1; y < jobArray.length; y++) {
            if(jobArray[y-1].End < jobArray[y].Start) {
                jobBlanks[jobBlanks.length] = new Array(jobArray[y-1].End, jobArray[y].Start);
            }
        }

        if(jobArray[0].Start != true_min_date)             {jobBlanks[jobBlanks.length] = new Array(true_min_date, jobArray[0].Start);}
        if(max_date - jobArray[jobArray.length -1].End > (28 * 24*60*60*1000)) {
            jobBlanks[jobBlanks.length] = new Array(jobArray[jobArray.length-1].End, max_date);
        }

        for(var z =0; z < jobBlanks.length; z++) {
            addJob("Filler","",jobBlanks[z][0],jobBlanks[z][1],"");
        }
        jobArray.sort(sort_by_date);



        // Step 4: Calculate the year timeline
        min_date = jobArray[0].Start;
        max_date = jobArray[jobArray.length-1].End;

        yr_timeline(true_min_date.getFullYear(),max_date.getFullYear());

        // Step 5: Calculate the career timeline.
        var tl_graph = "<table cellpadding=0 cellspacing=0 height=18 width=100% border=0><tr>";
        var cspan = (max_date - min_date)
        var next_car = 1;
        var counter = 0;
        var counter_disp;

        for(var a=0; a < jobArray.length; a++) {
            tl_graph = tl_graph + "<td ";
            if(jobArray[a].Firm=="Filler") { tl_graph = tl_graph +" class='cr_txt0' "; counter_disp="&nbsp;";}
            else {tl_graph = tl_graph + " class = 'cr_txt" + next_car + "' ";
                counter++;
                if(chk_nums==true){counter_disp =counter;} else {counter_disp="&nbsp;"}
                if(next_car==1){next_car=2;} else {next_car=1;}}
            tl_graph = tl_graph +" width=" + Math.round((10000 * (jobArray[a].End - jobArray[a].Start))/cspan)/100 +"%>" + counter_disp +"</td>";
        }
        tl_graph = tl_graph + "</tr></table>";


        document.getElementById("job_tl").innerHTML = tl_graph;

        var career_title1 ="<tr><td><table cellpadding=0 cellspacing=0 border=0 width=100%><tr class=\"cr_tr1\">";
        var career_pos = "</tr></table></td></tr><tr><td><table cellpadding=0 cellspacing=0 border=0 width=100%><tr class=\"cr_tr2\">";
        var career_title2 = "";
        var career_pos2 = "";
        var width1;
        var width2;

        //Step 6: Calculate the titles
        // Count the number of jobs
        // if > 6 then we'll print them on a single row, otherwise we'll use two rows
        var job_count=0;
        var job_rows=2;
        var job_width1=0;
        var job_width2=0;
        for(var b=0; b < jobArray.length; b++) { if(jobArray[b].Firm !="Filler") { job_count++;}}
        if(job_count <= 6) {
            job_rows =1;
            document.getElementById("ppane_car").style.height="80px";
        }
        else {
            document.getElementById("ppane_car").style.height="113px";
        }

        // now calculate the width
        // if there's one row, then it's simple: each one gets an even proportion of the width
        // but if there are two, then we need to stagger them a bit.  If there's an odd number then
        // this happens automatically (i.e., 3 on the top, 2 on the bottom), buf if there's an even
        // number then we have to push the top row a bit to the right, and the bottom row a bit to the left.
        career_title1 ="";
        career_pos1 = "";
        career_title2="";
        career_pos2 = "";

        if(job_rows ==1)       { job_width1 = 100/job_count; }
        else if(isEven(job_count)) { job_width1 = 100/((job_count/2) +.5);  job_width2=job_width1;}
        else                   { job_width1 = 100/Math.ceil(job_count/2); job_width2 = 100/(Math.floor(job_count/2) + 1);}

        job_count =0;
        var alt_rows=1;
        var job_count_disp;


        for(var c=0; c < jobArray.length; c++) {
            if(jobArray[c].Firm !="Filler") {
                job_count++;
                if(chk_nums==true){job_count_disp=job_count;} else {job_count_disp="";}
                if(job_rows ==2) {alt_rows = isAltRow(job_count);}

                if(alt_rows==1) {
                    career_title1 += "<td class='car_title1' width=" + job_width1 +"%>" + job_count_disp + " " + jobArray[c].Firm +"</td>";
                    career_pos1 += "<td class='car_pos1' width=" + job_width1 +"%>" + jobArray[c].Title +"</td>";
                }
                else {
                    career_title2 += "<td class='car_title2' width=" + job_width2 +"%>" + job_count_disp + " " + jobArray[c].Firm +"</td>";
                    career_pos2 += "<td class='car_pos2' width=" + job_width2 +"%>" + jobArray[c].Title +"</td>";
                }
            }
        }
        if(job_rows ==2) {
            if(isEven(job_count) == true) {
                career_title1 += "<td class='car_title1' width=" + job_width1/2 +"%></td>";
                career_pos1 += "<td class='car_pos1' width=" + job_width1/2 +"%></td>";
                career_title2 = "<td class='car_title2' width=" + job_width2/2 +"%></td>" + career_title2;
                career_pos2 = "<td class='car_pos2' width=" + job_width2/2 +"%></td>" + career_pos2;
            }
            else {
                career_title2 = "<td class='car_title2' width=" + job_width2/2 +"%></td>" + career_title2 + "<td class='car_title2' width=" + job_width2/2 +"%></td>";
                career_pos2 = "<td class='car_pos2' width=" + job_width2/2 +"%></td>" + career_pos2 + "<td class='car_pos2' width=" + job_width2/2 +"%></td>";
            }
        }

        // Now put on the front and back of each row

        career_title1 ="<table border=0 cellpadding=0 cellspacing=0 border=0 width=100%><tr class=\"cr_tr1\">" + career_title1 +"</tr></table>";
        career_pos1 = "<table cellpadding=0 cellspacing=0 border=0 width=100%><tr class=\"cr_tr2\">" + career_pos1 +"</tr></table>";

        if(job_rows ==2) {
            career_title2="<table cellpadding=0 cellspacing=0 border=0  width=100%><tr class=\"cr_tr1\">" + career_title2 +"</tr></table>";
            career_pos2 = "<table cellpadding=0 cellspacing=0 border=0 width=100%><tr class=\"cr_tr2\">" + career_pos2 +"</tr></table>";
        }
        else {
            career_title2="";
            career_pos2 = "";
        }

        document.getElementById("career_row1").innerHTML = career_title1;
        document.getElementById("career_row2").innerHTML = career_pos1;
        document.getElementById("career_row3").innerHTML = career_title2;
        document.getElementById("career_row4").innerHTML = career_pos2;

    }

});

