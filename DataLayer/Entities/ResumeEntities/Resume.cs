using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Entities.ResumeEntities
{
    public class Resume
    {
        public int Id { get; set; }

        public string firstName { get; set; }
        public string middleName { get; set; }
        public string lastName { get; set; }

        public string addrStreet { get; set; }
        public string addrTown { get; set; }
        public string addrState { get; set; }
        public string addrZip { get; set; }

        public string phone1 { get; set; }
        public string number1 { get; set; }

        public string phone2 { get; set; }
        public string number2 { get; set; }


        public virtual ICollection<Highschools> highschools { get; set; }
        public virtual ICollection<Colleges> colleges { get; set; }
        public virtual ICollection<Certifications> certificates { get; set; }

        public virtual ICollection<Jobs> jobs { get; set; }
    }
}
