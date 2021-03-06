﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Entities.ResumeEntities
{
    public class ResumeEntitiesWrapper
    {
        public Resume resume;
        public List<Jobs> jobList { get; set; }
        public List<Highschools> highschoolList { get; set; }
        public List<Colleges> collegeList { get; set; }
        public List<Certifications> certificationList { get; set; }
    }
}
