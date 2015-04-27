using _9ResWeb.Models;
using AutoMapper;
using LogicLayer;
using Res.DTOs.ResumeDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace _9ResWeb.Controllers
{
    public class ResumeBuilderController : Controller
    {

        private ResumeManager _resumeManager;

        public ResumeBuilderController()
        {
            _resumeManager = new ResumeManager();
        }
        //
        // GET: /ResumeBuilder/
        public ActionResult Index(int id = 0)
        {

            ResumeDTO resumeDTO;

            if (!User.Identity.IsAuthenticated)
                return View();

            var identity = (System.Security.Claims.ClaimsIdentity)User.Identity;
            var userId = identity.Claims.FirstOrDefault(i => i.Type == System.Security.Claims.ClaimTypes.NameIdentifier).Value;
            if (id < 1)
                return View();

            var resume = _resumeManager.GetUserResumeData(id, userId);

            ResumeViewModel returnval = new ResumeViewModel() { education = new EducationViewModel() };
            returnval.contactInfo = Mapper.Map<ContactInfoViewModel>(resume);
            returnval.education.highSchools = Mapper.Map<List<HighschoolViewModel>>(resume.highschoolList);
            returnval.education.colleges = Mapper.Map<List<CollegeViewModel>>(resume.collegeList);
            returnval.education.certificates = Mapper.Map<List<CertificationViewModel>>(resume.certificationList);
            returnval.jobs = Mapper.Map<List<JobViewModel>>(resume.jobList);
            returnval.skills = Mapper.Map<List<SkillSetViewModel>>(resume.skillSetList);
            returnval.objectives = Mapper.Map<List<ObjectiveViewModel>>(resume.objectivesList);

            return View(returnval);
        }
	}
}