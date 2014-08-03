using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using _9ResWeb.Models;
using LogicLayer.DTOs;
using LogicLayer.DTOs.Resume;

namespace _9ResWeb.App_Start
{
    public class AutoMapperConfig
    {
        public static void RegisterMappings()
        {
            Mapper.CreateMap<ContactInfoViewModel, ResumeDTO>();

            Mapper.CreateMap<CollegeViewModel, CollegeDTO>();
            Mapper.CreateMap<HighschoolViewModel, HighschoolDTO>();
            Mapper.CreateMap<CertificationViewModel, CertificationDTO>();

            Mapper.CreateMap<JobViewModel, JobDTO>();

        }
    }
}