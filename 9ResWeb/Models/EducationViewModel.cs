using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace _9ResWeb.Models
{
    public class EducationViewModel
    {
        public IEnumerable<HighschoolViewModel> highSchools { get; set; }
        public IEnumerable<CollegeViewModel> colleges { get; set; }
        public IEnumerable<CertificationViewModel> certificates { get; set; }
    }
}
