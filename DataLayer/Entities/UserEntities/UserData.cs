using DataLayer.Entities.ResumeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Entities.UserEntities
{
    class UserData
    {
        public int Id { get; set; }

        public virtual ICollection<Highschools> highschools { get; set; }
        public virtual ICollection<Colleges> colleges { get; set; }
        public virtual ICollection<Certifications> certificates { get; set; }
    }
}
