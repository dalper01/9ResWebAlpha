using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using _9ResWeb.Models;
using LogicLayer.DTOs;
using LogicLayer.DTOs.Resume;
using DataLayer;
using DataLayer.Entities.ResumeEntities;

namespace _9ResWeb.App_Start
{
    public class AutoMapperConfig
    {
        public static void RegisterMappings()
        {
            Mapper.CreateMap<ContactInfoViewModel, ResumeDTO>();

            Mapper.CreateMap<ResumeDTO, Resume>();
            Mapper.CreateMap<Resume, ResumeDTO>();
            Mapper.CreateMap<ResumeDTO, Resume>();

            Mapper.CreateMap<CollegeViewModel, CollegeDTO>();
            Mapper.CreateMap<CollegeDTO, Colleges>();
            Mapper.CreateMap<Colleges, CollegeDTO>();

            Mapper.CreateMap<HighschoolViewModel, HighschoolDTO>();
            Mapper.CreateMap<HighschoolDTO, Highschools>();
            Mapper.CreateMap<Highschools, HighschoolDTO>();

            Mapper.CreateMap<CertificationViewModel, CertificationDTO>();
            Mapper.CreateMap<CertificationDTO, Certifications>();
            Mapper.CreateMap<Certifications, CertificationDTO>();

            Mapper.CreateMap<JobViewModel, JobDTO>();
            Mapper.CreateMap<JobDTO, Jobs>();
            Mapper.CreateMap<Jobs, JobDTO>();

            Mapper.CreateMap<JobDetailViewModel, JobDetailDTO>();
            Mapper.CreateMap<JobDetailDTO, JobDetails>();
            Mapper.CreateMap<JobDetails, JobDetailDTO>();

        }
    }
}