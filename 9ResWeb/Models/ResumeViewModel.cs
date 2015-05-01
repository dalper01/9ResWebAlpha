using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _9ResWeb.Models
{
    public class ResumeViewModel
    {
        public int Id { get; set; }

        public ContactInfoViewModel contactInfo { get; set; }
        public EducationViewModel education { get; set; }
        public IEnumerable<JobViewModel> jobs { get; set; }
        public IEnumerable<SkillSetViewModel> skills { get; set; }
        public IEnumerable<ObjectiveViewModel> objectives { get; set; }
    }
}