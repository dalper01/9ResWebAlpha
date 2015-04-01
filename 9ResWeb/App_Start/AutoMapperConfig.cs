using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using _9ResWeb.Models;

using DataLayer;
using DataLayer.Entities.ResumeEntities;
using _9Res.DTOs.ResumeDTOs;
using DataLayer.Entities.UserEntities;

namespace _9ResWeb.App_Start
{
    public class AutoMapperConfig
    {
        public static void RegisterMappings()
        {
            Mapper.CreateMap<ContactInfoViewModel, ResumeDTO>();
            Mapper.CreateMap<ResumeDTO, ContactInfoViewModel>();

            Mapper.CreateMap<ResumeDTO, Resume>();
            Mapper.CreateMap<Resume, ResumeDTO>();

            Mapper.CreateMap<CollegeViewModel, CollegeDTO>();
            Mapper.CreateMap<CollegeDTO, CollegeViewModel>();
            Mapper.CreateMap<CollegeDTO, Colleges>();
            Mapper.CreateMap<Colleges, CollegeDTO>();

            Mapper.CreateMap<HighschoolViewModel, HighschoolDTO>();
            Mapper.CreateMap<HighschoolDTO, HighschoolViewModel>();
            Mapper.CreateMap<HighschoolDTO, Highschools>();
            Mapper.CreateMap<Highschools, HighschoolDTO>();

            Mapper.CreateMap<CertificationViewModel, CertificationDTO>();
            Mapper.CreateMap<CertificationDTO, CertificationViewModel>();
            Mapper.CreateMap<CertificationDTO, Certifications>();
            Mapper.CreateMap<Certifications, CertificationDTO>();

            Mapper.CreateMap<JobViewModel, JobDTO>();
            Mapper.CreateMap<JobDTO, JobViewModel>();
            Mapper.CreateMap<JobDTO, Jobs>();
            Mapper.CreateMap<Jobs, JobDTO>();

            Mapper.CreateMap<JobDetailViewModel, JobDetailDTO>();
            Mapper.CreateMap<JobDetailDTO, JobDetailViewModel>();
            Mapper.CreateMap<JobDetailDTO, JobDetails>();
            Mapper.CreateMap<JobDetails, JobDetailDTO>();

            Mapper.CreateMap<SkillSetViewModel, SkillSetDTO>();
            Mapper.CreateMap<SkillSetDTO, SkillSetViewModel>();
            Mapper.CreateMap<SkillSetDTO, SkillSet>();
            Mapper.CreateMap<SkillSet, SkillSetDTO>();

            Mapper.CreateMap<SkillViewModel, SkillDTO>();
            Mapper.CreateMap<SkillDTO, SkillViewModel>();
            Mapper.CreateMap<SkillDTO, Skill>();
            Mapper.CreateMap<Skill, SkillDTO>();

            Mapper.CreateMap<ObjectiveViewModel, ObjectiveDTO>();
            Mapper.CreateMap<ObjectiveDTO, ObjectiveViewModel>();
            Mapper.CreateMap<ObjectiveDTO, Objective>();
            Mapper.CreateMap<Objective, ObjectiveDTO>();

        }
    }
}