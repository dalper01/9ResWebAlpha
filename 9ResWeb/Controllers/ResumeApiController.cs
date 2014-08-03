using _9ResWeb.Models;
using AutoMapper;
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
        public HttpResponseMessage Post( [FromBody]ResumeViewModel newResume)
        {

            var contactInfo = Mapper.Map<ResumeDTO>(newResume.contactInfo);

            var collegeList = Mapper.Map<List<CollegeDTO>>(newResume.education.colleges);
            var highschoolList = Mapper.Map<List<HighschoolDTO>>(newResume.education.highschools);
            var certificationList = Mapper.Map<List<CertificationDTO>>(newResume.education.certificates);

            var jobList = Mapper.Map<List<JobViewModel>>(newResume.jobs);

            return Request.CreateResponse(HttpStatusCode.Created);

            //return Request.CreateResponse(HttpStatusCode.BadRequest);

        }
    }
}
