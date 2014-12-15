using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataLayer;
using LogicLayer.DTOs.Resume;
using AutoMapper;
using DataLayer.Entities.ResumeEntities;

namespace LogicLayer
{
    public class ResumeManager
    {

        private ResumeRepo resumeRepo;

        public ResumeManager()
        {
            resumeRepo = new ResumeRepo();
        }

        public ResumeDTO AddResume( ResumeDTO newResume)
        {
            ResumeEntitiesWrapper resWrapper = new ResumeEntitiesWrapper();

            // map DTO's to Entities in Wrapper
            resWrapper.resume = Mapper.Map<Resume>(newResume);
            resWrapper.jobList = Mapper.Map<List<Jobs>>(newResume.jobList);
            resWrapper.collegeList = Mapper.Map<List<Colleges>>(newResume.collegeList);
            resWrapper.highschoolList = Mapper.Map<List<Highschools>>(newResume.highschoolList);
            resWrapper.certificationList = Mapper.Map<List<Certifications>>(newResume.certificationList);

            Resume savedRes = resumeRepo.AddResume(resWrapper);

            ResumeDTO retRes = Mapper.Map<ResumeDTO>(savedRes);
            retRes.jobList = Mapper.Map<List<JobDTO>>(savedRes.jobs);
            retRes.collegeList = Mapper.Map<List<CollegeDTO>>(savedRes.colleges);
            retRes.highschoolList = Mapper.Map<List<HighschoolDTO>>(savedRes.highschools);
            retRes.certificationList = Mapper.Map<List<CertificationDTO>>(savedRes.certificates);


            return retRes;
        }


    }
}
