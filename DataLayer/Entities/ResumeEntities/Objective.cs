using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Entities.ResumeEntities
{
    public class Objective
    {
        public int Id { get; set; }
        public string UserId { get; set; }

        public string description { get; set; }

        public virtual ICollection<Resume> Resume { get; set; }
    }
}
