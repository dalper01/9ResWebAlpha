using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataLayer
{
    public class Certifications
    {
        public int Id { get; set; }
        public string type { get; set; }
        public string Provider { get; set; }

        public bool completed { get; set; }
        public string compMonth { get; set; }
        public string compYear { get; set; }

    }
}
