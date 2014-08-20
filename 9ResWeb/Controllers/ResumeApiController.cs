using _9ResWeb.Models;
using AutoMapper;
using LogicLayer;
using LogicLayer.DTOs.Resume;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace _9ResWeb.Controllers
{
    public class ResumeApiController : ApiController
    {

        private ResumeManager _resumeManager;

        public ResumeApiController()
        {
            _resumeManager = new ResumeManager();
        }


        public HttpResponseMessage Post( [FromBody]ResumeViewModel newResume)
        {

            ResumeDTO resumeDTO = Mapper.Map<ResumeDTO>(newResume.contactInfo);

            resumeDTO.collegeList = Mapper.Map<List<CollegeDTO>>(newResume.education.colleges);
            resumeDTO.highschoolList = Mapper.Map<List<HighschoolDTO>>(newResume.education.highschools);
            resumeDTO.certificationList = Mapper.Map<List<CertificationDTO>>(newResume.education.certificates);

            resumeDTO.jobList = Mapper.Map<List<JobDTO>>(newResume.jobs);

            var a = _resumeManager.AddResume(resumeDTO);



            return Request.CreateResponse(HttpStatusCode.Created);
        }
    }
}
