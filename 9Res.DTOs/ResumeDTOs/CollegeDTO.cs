using Res.DTOs.Abstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Res.DTOs.ResumeDTOs
{
    public class CollegeDTO : EntityBase
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string city { get; set; }
        public string state { get; set; }

        public string degreeType { get; set; }
        public string degreeProgram { get; set; }

        public bool graduated { get; set; }
        public string gradMonth { get; set; }
        public string gradYear { get; set; }

    }
}
