using DataLayer.Entities.ResumeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataLayer.Entities.UserEntities
{
    public class Certifications
    {
        public int Id { get; set; }
        public string UserId { get; set; }

        public string Type { get; set; }
        public string Provider { get; set; }

        public bool completed { get; set; }
        public string compMonth { get; set; }
        public string compYear { get; set; }

        public virtual ICollection<Resume> Resume { get; set; }

    }
}
