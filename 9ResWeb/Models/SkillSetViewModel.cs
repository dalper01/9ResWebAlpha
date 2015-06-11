using Res.DTOs.Abstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _9ResWeb.Models
{
    public class SkillSetViewModel : EntityBase
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public IEnumerable<SkillViewModel> Skills { get; set; }
    }

    public class SkillViewModel : EntityBase
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
