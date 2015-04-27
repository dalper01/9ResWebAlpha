using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using System.Data.Entity;
using LogicLayer;
using AutoMapper;
using _9ResWeb.Models;
using System.Security.Claims;
using Microsoft.Owin.Security;

using System.Threading.Tasks;

namespace _9ResWeb.Controllers
{
    public class HomeController : Controller
    {
        string userId;
        private ResumeManager _resumeManager;


        public HomeController()
        {

            _resumeManager = new ResumeManager();

        }

        public ActionResult Index()
        {

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "All bout 9res.";

            return View();
        }

        public ActionResult Resumes()
        {

            userId = HttpContext.User.Identity.GetUserId();

            var resumeList = _resumeManager.GetUserResumes(userId);
            var VMresumes = Mapper.Map<List<ResumeViewModel>>(resumeList);


            return View(VMresumes);
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "contact 9res";


            return View();
        }
    }
}