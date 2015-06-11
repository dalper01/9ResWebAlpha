using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataLayer;
using AutoMapper;
using DataLayer.Entities.ResumeEntities;
using Res.DTOs.ResumeDTOs;
using DataLayer.Entities;
using DataLayer.Entities.UserEntities;

namespace LogicLayer
{
    public class ResumeManager
    {

        private ResumeRepo resumeRepo;

        public ResumeManager()
        {
            resumeRepo = new ResumeRepo();
        }

        public ResumeDTO GetUserResumeData(Guid resumeId, string userId, bool isAnonymous = false)
        {
            var userResumeData = resumeRepo.GetUserResumeData(resumeId, userId, isAnonymous);

            return userResumeData;
        }



        public ResumeDTO GetUserNewData(string userId)
        {
            var userResumeData = resumeRepo.GetNewResumeData(userId);

            return userResumeData;
        }



        public List<ResumeDTO> GetUserResumes(string userId)
        {
            List<ResumeDTO> resumeList = resumeRepo.GetUserResumes( userId);

            return resumeList;
        }

        public ResumeDTO SaveResume( string userId, ResumeDTO saveResume)
        {
            ResumeEntitiesWrapper resWrapper = new ResumeEntitiesWrapper();

            // map DTO's to Entities in Wrapper
            //resWrapper.resume = Mapper.Map<Resume>(saveResume);
            //resWrapper.jobList = Mapper.Map<List<Jobs>>(saveResume.jobList);
            //resWrapper.collegeList = Mapper.Map<List<Colleges>>(saveResume.collegeList);
            //resWrapper.highschoolList = Mapper.Map<List<Highschools>>(saveResume.highschoolList);
            //resWrapper.certificationList = Mapper.Map<List<Certifications>>(saveResume.certificationList);

            //resWrapper.skillSetsList = Mapper.Map<List<SkillSet>>(saveResume.skillSetList);
            //resWrapper.objectivesList = Mapper.Map<List<Objective>>(saveResume.objectivesList);

            ResumeDTO retRes = resumeRepo.UpdateResume(userId, saveResume);

            //ResumeDTO retRes = Mapper.Map<ResumeDTO>(savedRes);
            //retRes.jobList = Mapper.Map<List<JobDTO>>(savedRes.jobs);
            //retRes.collegeList = Mapper.Map<List<CollegeDTO>>(savedRes.colleges);
            //retRes.highschoolList = Mapper.Map<List<HighschoolDTO>>(savedRes.highschools);
            //retRes.certificationList = Mapper.Map<List<CertificationDTO>>(savedRes.certificates);

            //retRes.skillSetList = Mapper.Map<List<SkillSetDTO>>(savedRes.skillSets);
            //retRes.objectivesList = Mapper.Map<List<ObjectiveDTO>>(savedRes.objectives);

            return retRes;
        }


    }
}
