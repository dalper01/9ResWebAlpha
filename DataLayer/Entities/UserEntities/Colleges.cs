﻿using DataLayer.Entities.ResumeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataLayer.Entities.UserEntities
{
    public class Colleges
    {
        public int Id { get; set; }
        public string UserId { get; set; }

        public string name { get; set; }
        public string city { get; set; }
        public string state { get; set; }

        public string degreeType { get; set; }
        public string degreeProgram { get; set; }

        public bool graduated { get; set; }
        public string gradMonth { get; set; }
        public string gradYear { get; set; }

        public virtual ICollection<Resume> Resume { get; set; }

    }
}