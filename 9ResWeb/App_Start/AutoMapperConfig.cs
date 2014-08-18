using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using _9ResWeb.Models;
using LogicLayer.DTOs;
using LogicLayer.DTOs.Resume;
using DataLayer;

namespace _9ResWeb.App_Start
{
    public class AutoMapperConfig
    {
        public static void RegisterMappings()
        {
            Mapper.CreateMap<ContactInfoViewModel, ResumeDTO>();
            Mapper.CreateMap<ResumeDTO, Resume>();

            Mapper.CreateMap<CollegeViewModel, CollegeDTO>();
            Mapper.CreateMap<CollegeDTO, Colleges>();
            Mapper.CreateMap<HighschoolViewModel, HighschoolDTO>();
            Mapper.CreateMap<HighschoolDTO, Highschools>();
            Mapper.CreateMap<CertificationViewModel, CertificationDTO>();
            Mapper.CreateMap<CertificationDTO, Certifications>();

            Mapper.CreateMap<JobViewModel, JobDTO>();
            Mapper.CreateMap<JobDTO, Jobs>();
            Mapper.CreateMap<JobDetailViewModel, JobDetailDTO>();
            Mapper.CreateMap<JobDetailDTO, JobDetails>();

        }
    }
}