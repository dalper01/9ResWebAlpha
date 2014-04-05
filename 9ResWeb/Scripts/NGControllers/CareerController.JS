/*

addJobDetails(3,1,"Conducted extensive interviews with upper level management throughout the organization to precisely define its business nomenclature (e.g., product, account, event, stage, track, etc). Once precise definitions were defined, this nomenclature was published and distributed throughout the organization.");
addJobDetails(3,2,"Designed and implemented SLX-Report, M|C�s enterprise-wide sales reporting system. This reporting system provides up-to-the-minute sales reporting across the entire organization, using the unified business nomenclature.");
addJobDetails(3,3,"Integrated SLX-Report into the company's operations management system, to automatically notify operations project leaders and help define a proper sales commissions policy � further unifying M|C�s business processes.");
*/
/*  addJobDetails(4,1,"Developed and implemented Prospector, a global Business Intelligence system that merges business activity from seven sales offices and six manufacturing plants in the United States, Belgium, Canada, Denmark, France, Germany, Japan, Russia and the United Kingdom");
 addJobDetails(4,2,"Prospector allows upper management to see total company sales, on an up-to-the-moment basis, in any currency used within the organization. It also provides tight coordination between sales offices and manufacturing plants, to quickly route sales to the optimal manufacturing plant. This routing process uses a sophisticated algorithm that assesses the customer�s desired delivery date, current plant utilization levels, the specific items ordered, plant/customer proximity, and even country-specific customs issues.");
 addJobDetails(4,3,"Prospector�s global implementation involved designing over-arching data flow diagrams (illustrating the entire lifecycle of all data flowing into the company, through validation / normalization / aggregation, and into the data warehouse); full network topologies (illustrating every machine, connection, application, protocol and operating system); logical and physical data models; and ETL documentation standards used by on-site warehousing teams in each country.");
 *//*

if(jtoshow >= 3) {addJob(3,"M|C Communications", "Business Intelligence Consultant", "Boston, MA", "MC Comm.","BI Consultant","07/01/2006","04/01/2008","");}
if(jtoshow >= 4) {addJob(4,"Areva", "Business Intelligence Consultant", "Meriden, CT", "Areva","BI Consultant","08/01/2005","06/01/2006","");}
if(jtoshow >= 5) {addJob(5,"EMD Serono", "Business Intelligence Consultant", "Rockland, MA", "EMD Serono","BI Consultant","04/01/2003","08/01/2005","");}
if(jtoshow >= 6) {addJob(6,"Verispan", "Business Intelligence Consultant", "Waltham, MA", "Verispan","BI Consultant","01/01/2003","04/01/2003","");}
if(jtoshow >= 7) {addJob(7,"Investment Technology Group", "Business Intelligence Consultant", "Boston, MA", "ITG","BI Consultant","10/01/2001","12/01/2002","");}
if(jtoshow >= 8) {addJob(8,"Palm Computing", "Business Intelligence Consultant", "Cambridge, MA", "Palm Computing","BI Consultant","03/01/2001","10/01/2001","");}
if(jtoshow >= 9) {addJob(9,"Akamai Technologies", "Technical Team Leader", "Cambridge, MA", "Akamai","Tech. Team Leader","04/01/2000","03/01/2001","Y");}
if(jtoshow >= 10) {addJob(10,"Akamai Technologies", "Senior Developer", "Cambridge, MA", "Akamai","Senior Developer","10/01/1999","04/01/2000","");}
if(jtoshow >= 11) {addJob(11,"Oracle Corporatoin", "Sr. Member of the Technical Staff", "Waltham, MA", "Oracle Corp","Sr. Member Tech Staff","10/01/1997","10/01/1999","");}
if(jtoshow >= 12) {addJob(12,"IMS", "Business Intelligence Consultant", "Philadelphia, PA", "IMS","BI Consultant","08/01/1996","09/01/1997","");}
if(jtoshow >= 13) {addJob(13,"BellSouth", "Report Developer", "Atlanta, GA", "BellSouth","Report Developer","05/01/1995","08/01/1996","");}

*/

var CareerModule = angular.module('CareerModule', ['ui.bootstrap', 'commonDirectives', 'navBarApp']);


CareerModule.controller('CareerController',
function ($scope, $modal){
 //   var CareerController = function ($scope, $modal){

        //alert("hello");
        $scope.jobs = [
            {id: 1,
                firmLong: "Akamai Technologies",
                titleLong: "Sr. Business Intelligence Architect",
                city: "Cambridge",
                state: "MA",
                firmShort: "Akamai",
                titleShort: "Sr. BI Architect",
                startMonth: "07",
                startYear: "2009",
                startDateString: "",
                endMonth: "",
                endYear: "",
                endDateStr: "",
                details: [
                    {
                        id: 1,
                        order: 1,
                        description: "Generated Robot, Akamai's Revenue Forecasting system, which is used to generate company revenue forecasts announced each quarter to Wall Street analysts. This system forecasts internet traffic for every Akamai client, identifying client-specific trending and seasonality. It then runs these forecasts through our Invoicing system, to generate a very detailed revenue forecast. In its first quarter of operations, Revenue was forecasted within 1% -- a substantial improvement over Akamai�s historical 5-8% forecast accuracy."
                    }
                ]
            },

            {id: 2,
                firmLong: "Lenovo Corporation",
                titleLong: "Business Intelligence Consultant",
                city: "Boston",
                state: "MA",
                firmShort: "MC Comm",
                titleShort: "BI Consultant",
                startMonth: "04",
                startYear: "2008",
                startDateString: "",
                endMonth: "07",
                endYear: "2009",
                endDateStr: "",
                details: [
                    {
                        id: 2,
                        order: 1,
                        description: "Proposed, designed and developed LGOS (Lenovo Global Order Status), a reporting application that handles all Lenovo order reporting, for internal business users, external partners and major customers"
                    },
                    {
                        id: 3,
                        order: 2,
                        description: "Built a data model and reporting system, AppTracker, for Lenovo to track and report upon over five thousand IBM and Lenovo business applications. This is part of its strategy to fully separate Lenovo's business activities from IBM's, and to migrate Lenovo to its own long-term IT platform."
                    }
                ]

            }];


    jobArray = new Array();
    jobArray = $scope.jobs;
    //jobDetails = new Array();
    old_msg="";
    chk_msg="";
    display_jobs('');
    set_cr_height();
    //edit_job(1);

    $("input:text, textarea, select").addClass("input_inactive_ob");
    $("input:text, textarea, select").focus(function(){$(this).addClass("input_active_ob").removeClass("input_inactive_ob");
    }).blur(function(){$(this).removeClass("input_active_ob").addClass("input_inactive_ob");
        });



        /*
            $scope.maxDetailOrder = function(){

                var highestOrder=0;

                for (var i = 1; i < 100*99999; i++) {

                }

                return 1;
            }
        */


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

