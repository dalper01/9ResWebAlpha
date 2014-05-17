using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
//using DataLayer;
using System.Data.Entity;
using LogicLayer;


namespace _9ResWeb.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //using ( var context = new ExamContext() )
            //{

            //    //var Exams = context.Exam
            //    //    .Where(e => e.Tests.Any(t => t.UserTests.Any(u => u.UserId == "0"))).ToList();

            //    //var Exams2 = context.Exam
            //    //    .Where(e => e.Tests.Any(t => t.UserTests.Any(u => u.UserId == "0"))).ToList();

            //    //var Exams2 = context.Exam
            //    //    .Include(e => e.Tests.Select(t => t.UserTests.Any(u => u.UserId == "0")).Include(e => e.Tests.Select(t => t.UserTests.Any(u => u.UserId == "0"))).ToList();
            
            //    //var Exams2 = context.Exam
            //    //    .Include(e => e.Tests.Select(t => t.UserTests)).Where(e => e.Tests.Distinct(t => t.UserTests.Any(u => u.UserId == "0")) && 1==1).ToList();
            
            //}
            //var something = new ResumeRepo();

            //var ctx = new ResumeContext();

            //var res = ctx.Resume.ToList();
            //var context = new ResumeRepo();

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";


            return View();
        }
    }
}