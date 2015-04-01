using _9Res.DTOs.ResumeDTOs;
using AutoMapper;
using DataLayer.Entities;
using DataLayer.Entities.ResumeEntities;
using DataLayer.Entities.UserEntities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer
{
    public class ResumeRepo
    {
        private ResumeContext rCtxt;

        public ResumeRepo()
        {
            rCtxt = new ResumeContext();
        }

        //public ResumeEntitiesWrapper UpdateResume(string userId, ResumeEntitiesWrapper resWrapper)
        public ResumeDTO UpdateResume(string userId, ResumeDTO saveResume)
        {

            ResumeDTO retResume;

            Resume resume = Mapper.Map<Resume>(saveResume);
            resume.UserId = userId;
            if (resume.Id > 0)
                rCtxt.Resume.Attach(resume);
            else rCtxt.Resume.Add(resume);


            List<Highschools> highschoolEntityList = new List<Highschools>();
            foreach (var highschoolDTO in saveResume.highschoolList)
            {
                Highschools highschool = Mapper.Map<Highschools>(highschoolDTO);
                highschool.UserId = userId;
                if (highschoolDTO.Id > 0)
                    rCtxt.Highschools.Attach(highschool);
                else rCtxt.Highschools.Add(highschool);

                highschoolEntityList.Add(highschool);
            }

            List<Colleges> collegeEntityList = new List<Colleges>();
            foreach (var collegeDTO in saveResume.collegeList)
            {
                Colleges college = Mapper.Map<Colleges>(collegeDTO);
                college.UserId = userId;
                if (college.Id > 0)
                    rCtxt.Colleges.Attach(college);
                else rCtxt.Colleges.Add(college);

                collegeEntityList.Add(college);
            }

            List<Certifications> certEntityList = new List<Certifications>();
            foreach (var certDTO in saveResume.certificationList)
            {
                Certifications cert = Mapper.Map<Certifications>(certDTO);
                cert.UserId = userId;
                if (cert.Id > 0)
                    rCtxt.Certifications.Attach(cert);
                else rCtxt.Certifications.Add(cert);

                certEntityList.Add(cert);
            }

            //foreach (var jobDTO in saveResume.jobList)
            //{
            //    Jobs job = Mapper.Map<Jobs>(jobDTO);
            //    job.UserId = userId;
            //    if (job.Id > 0)
            //        resume.jobs.Add(job);
            //    else resume.jobs.Add(job);
            //}
            resume.jobs = Mapper.Map<List<Jobs>>(saveResume.jobList);
            resume.jobs.Each(j => j.UserId = userId);

            List<SkillSet> skillSetEntityList = new List<SkillSet>();
            foreach (var skillSetDTO in saveResume.skillSetList)
            {
                SkillSet skillSet = Mapper.Map<SkillSet>(skillSetDTO);
                skillSet.UserId = userId;
                if (skillSet.Id > 0)
                    rCtxt.SkillSets.Attach(skillSet);
                else rCtxt.SkillSets.Add(skillSet);

                skillSetEntityList.Add(skillSet);
                foreach (var skill in skillSet.Skills)
                {
                    if (skill.Id == 0)
                        rCtxt.Entry(skill).State = EntityState.Added;
                    else
                        rCtxt.Entry(skill).State = EntityState.Modified;
                }
            }

            List<Objective> objectiveEntityList = new List<Objective>();
            foreach (var objectiveDTO in saveResume.objectivesList)
            {
                Objective objective = Mapper.Map<Objective>(objectiveDTO);
                objective.UserId = userId;
                if (objective.Id > 0)
                    rCtxt.Objectives.Attach(objective);
                else rCtxt.Objectives.Add(objective);

                objectiveEntityList.Add(objective);
            }

            //var res = rCtxt.Resume.Add(resWrapper.resume);

            rCtxt.SaveChanges();

            retResume = Mapper.Map<ResumeDTO>(resume);
            retResume.highschoolList = Mapper.Map<List<HighschoolDTO>>(highschoolEntityList);
            retResume.collegeList = Mapper.Map<List<CollegeDTO>>(collegeEntityList);
            retResume.certificationList = Mapper.Map<List<CertificationDTO>>(certEntityList);
            retResume.jobList = Mapper.Map<List<JobDTO>>(resume.jobs);
            retResume.skillSetList = Mapper.Map<List<SkillSetDTO>>(skillSetEntityList);
            retResume.objectivesList = Mapper.Map<List<ObjectiveDTO>>(objectiveEntityList);


            return retResume;
        }

    }
}
