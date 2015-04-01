using DataLayer.Entities.ResumeEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Entities.UserEntities
{
    public class SkillSet
    {
        public int Id { get; set; }
        public string UserId { get; set; }

        public string Title { get; set; }
        public IEnumerable<Skill> Skills { get; set; }

        public virtual ICollection<Resume> Resume { get; set; }

    }

    public class Skill
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
