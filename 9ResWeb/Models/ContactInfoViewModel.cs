using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _9ResWeb.Models
{
    public class ContactInfoViewModel
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

        public string eMail { get; set; }
        public string socialMediaLogo { get; set; }
        public string socialMedia { get; set; }

    }
}