using DataLayer.Entities.ResumeEntities;
using Res.DTOs.Abstracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Entities.UserEntities
{
    public class SkillSet : EntityBase
    {
        public int Id { get; set; }
        public string UserId { get; set; }

        public string Title { get; set; }
        public virtual ICollection<Skill> Skills { get; set; }

        public virtual ICollection<Resume> Resume { get; set; }

    }

    public class Skill : EntityBase
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public int SkillSetId { get; set; }

        [ForeignKey("SkillSetId")]
        public virtual SkillSet SkillSet { get; set; }

    }
}
