using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace _9ResWeb.Models
{
    public class Education
    {
        public IEnumerable<Highschools> highschools { get; set; }
        public IEnumerable<Colleges> colleges { get; set; }
        public IEnumerable<Certifications> certificates { get; set; }
        //public IEnumerable<Highschools> highschools { get; set; }
    }
}
