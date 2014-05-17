using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _9ResWeb.Models
{
    public class Resume
    {
        public int ID { get; set; }
        public ContactInfo contactInfo { get; set; }
        public Education education { get; set; }
        public IEnumerable<Job> jobs { get; set; }
        //public ContactInfo contactInfo { get; set; }

    }
}