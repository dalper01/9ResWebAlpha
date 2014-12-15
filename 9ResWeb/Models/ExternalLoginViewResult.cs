using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _9ResWeb.Models
{
    public class ExternalLoginViewResult
    {
        public string Issuer { get; set; }
        public string Id { get; set; }
        //public string Email { get; set; }
        //public string FirstName { get; set; }
        //public string LastName { get; set; }
        //public string FullName { get; set; }

        //public string Gender { get; set; }

        //public string Link { get; set; }
        //public string Picture { get; set; }

        public UserInformation UserInfo;

        public string AccessToken { get; set; }
        public bool Success { get; set; }
        public bool NewAccount { get; set; }
    }
}