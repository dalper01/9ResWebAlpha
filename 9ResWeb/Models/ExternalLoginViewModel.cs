using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace _9ResWeb.Models
{
    public class ExternalLoginViewModel
    {
        [Required]
        [MinLength(3)]
        public string Issuer { get; set; }

        [Required]
        [MinLength(3)]
        public string Id { get; set; }

        public string FullId { get; set; }

        [Required]
        [Display(Name = "User name")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string Gender { get; set; }

        public string Link { get; set; }
        public string Picture { get; set; }

        //public string FullName { get; set; }
        public string AccessToken { get; set; }
    }
}