using AutoMapper;
using DataLayer.Entities;
using DataLayer.Entities.ResumeEntities;
using DataLayer.Entities.UserEntities;
using Res.DTOs.ResumeDTOs;
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

        /// <summary>
        /// GetUserResumeData
        /// </summary>
        /// <param name="resumeId"></param>
        /// <param name="userId"></param>
        /// <returns>User's Resume Info for Viewing or Editing</returns>
        public ResumeDTO GetUserResumeData(Guid resumeId, string userId)
        {
            var userResume = rCtxt.Resume.FirstOrDefault(r => r.UserId == userId && r.Id == resumeId);
            if (userResume == null)
                return null;

            var resDTO = Mapper.Map<ResumeDTO>(userResume);

            var userHighschools = rCtxt.Highschools.Where(o => o.UserId == userId).ToList();
            var userColleges = rCtxt.Colleges.Where(o => o.UserId == userId).ToList();
            var userCertifications = rCtxt.Certifications.Where(o => o.UserId == userId).ToList();
            var userJobs = rCtxt.Jobs.Where(o => o.UserId == userId).Include(j => j.details).ToList();
            var userSkillSets = rCtxt.SkillSets.Where(o => o.UserId == userId).Include(s=>s.Skills).ToList();
            var userObjectives = rCtxt.Objectives.Where(o => o.UserId == userId).ToList();

            resDTO.highschoolList = Mapper.Map<List<HighschoolDTO>>(userHighschools);
            resDTO.collegeList = Mapper.Map<List<CollegeDTO>>(userColleges);
            resDTO.certificationList = Mapper.Map<List<CertificationDTO>>(userCertifications);
            resDTO.jobList = Mapper.Map<List<JobDTO>>(userJobs);
            resDTO.skillSetList = Mapper.Map<List<SkillSetDTO>>(userSkillSets);
            resDTO.objectivesList = Mapper.Map<List<ObjectiveDTO>>(userObjectives);


            return resDTO;
        }

        /// <summary>
        /// GetUserResumes
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>List of User's Resume's for Resume Dashboard</returns>
        public List<ResumeDTO> GetUserResumes(string userId)
        {
            var resumeList = rCtxt.Resume.Where(r => r.UserId == userId);
            var resDTOs = Mapper.Map<List<ResumeDTO>>(resumeList);

            return resDTOs;
        }




        //public ResumeEntitiesWrapper UpdateResume(string userId, ResumeEntitiesWrapper resWrapper)
        public ResumeDTO UpdateResume(string userId, ResumeDTO saveResume)
        {

            ResumeDTO retResume;

            Resume resume = Mapper.Map<Resume>(saveResume);
            resume.UserId = userId;
            if (resume.Id != Guid.Empty)
            {
                rCtxt.Resume.Attach(resume);
                rCtxt.Entry(resume).State = EntityState.Modified;
            }
            else rCtxt.Resume.Add(resume);


            List<Highschools> highschoolEntityList = new List<Highschools>();
            foreach (var highschoolDTO in saveResume.highschoolList)
            {
                Highschools highschool = Mapper.Map<Highschools>(highschoolDTO);
                highschool.UserId = userId;
                if (highschoolDTO.Id > 0)
                {
                    rCtxt.Highschools.Attach(highschool);
                    rCtxt.Entry(highschool).State = EntityState.Modified;
                }
                else rCtxt.Highschools.Add(highschool);

                highschoolEntityList.Add(highschool);
            }

            List<Colleges> collegeEntityList = new List<Colleges>();
            foreach (var collegeDTO in saveResume.collegeList)
            {
                Colleges college = Mapper.Map<Colleges>(collegeDTO);
                college.UserId = userId;
                if (college.Id > 0)
                {
                    rCtxt.Colleges.Attach(college);
                    rCtxt.Entry(college).State = EntityState.Modified;
                }
                else rCtxt.Colleges.Add(college);

                collegeEntityList.Add(college);
            }

            List<Certifications> certEntityList = new List<Certifications>();
            foreach (var certDTO in saveResume.certificationList)
            {
                Certifications cert = Mapper.Map<Certifications>(certDTO);
                cert.UserId = userId;
                if (cert.Id > 0)
                {
                    rCtxt.Certifications.Attach(cert);
                    rCtxt.Entry(cert).State = EntityState.Modified;
                }
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
            resume.jobs = Mapper.Map<ICollection<Jobs>>(saveResume.jobList.ToList());
            foreach (var job in resume.jobs)
            {
                job.UserId = userId;
                job.ResumeId = resume.Id;
                if (job.Id > 0)
                    rCtxt.Entry(job).State = EntityState.Modified;
                else
                    rCtxt.Entry(job).State = EntityState.Added;

                foreach (var jobDetail in job.details)
                {
                    jobDetail.JobId = job.Id;
                    if (jobDetail.Id > 0)
                        rCtxt.Entry(jobDetail).State = EntityState.Modified;
                    else
                        rCtxt.Entry(jobDetail).State = EntityState.Added;
                }



            }
            //resume.jobs.Each(j => j.UserId = userId);

            List<SkillSet> skillSetEntityList = new List<SkillSet>();
            foreach (var skillSetDTO in saveResume.skillSetList)
            {
                SkillSet skillSet = Mapper.Map<SkillSet>(skillSetDTO);
                foreach (var skill in skillSet.Skills)
                    skill.SkillSetId = skillSet.Id;
                skillSet.UserId = userId;
                if (skillSet.Id > 0)
                {
                    rCtxt.SkillSets.Attach(skillSet);
                    rCtxt.Entry(skillSet).State = EntityState.Modified;
                }
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
                {
                    rCtxt.Objectives.Attach(objective);
                    rCtxt.Entry(objective).State = EntityState.Modified;
                }
                else rCtxt.Objectives.Add(objective);

                objectiveEntityList.Add(objective);
            }

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
