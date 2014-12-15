using DataLayer.Entities.ResumeEntities;
using System;
using System.Collections.Generic;
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

        public Resume AddResume(ResumeEntitiesWrapper resWrapper)
        {

            resWrapper.resume.certificates = resWrapper.certificationList;
            resWrapper.resume.colleges = resWrapper.collegeList;
            resWrapper.resume.jobs = resWrapper.jobList;

            var res = rCtxt.Resume.Add(resWrapper.resume);
            //res.certificates.Add(resWrapper.certificationList);
            //res.certificates = resWrapper.certificationList;

            rCtxt.SaveChanges();

            return res;
        }

    }
}
