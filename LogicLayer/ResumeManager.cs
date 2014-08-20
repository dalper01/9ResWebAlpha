using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataLayer;
using LogicLayer.DTOs.Resume;
using AutoMapper;

namespace LogicLayer
{
    public class ResumeManager
    {

        private ResumeRepo _resumeRepo;

        public ResumeManager()
        {
            _resumeRepo = new ResumeRepo();
        }

        public ResumeDTO AddResume( ResumeDTO newResume)
        {

            Resume resumeEnt = Mapper.Map<Resume>(newResume);

            List<Jobs> jobList = Mapper.Map<List<Jobs>>(newResume.jobList);

            List<Colleges> collegeList = Mapper.Map<List<Colleges>>(newResume.collegeList);
            List<Highschools> highschoolList = Mapper.Map<List<Highschools>>(newResume.highschoolList);
            List<Certifications> certificationList = Mapper.Map<List<Certifications>>(newResume.certificationList);

            return newResume;
        }


    }
}
