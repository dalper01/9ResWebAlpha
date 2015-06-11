using Res.DTOs.Abstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Res.DTOs.ResumeDTOs
{
    public class JobDTO : EntityBase
    {
        public int Id { get; set; }
        public string firmLong { get; set; }
        public string firmShort { get; set; }
        public string titleLong { get; set; }
        public string titleShort { get; set; }

        public string city { get; set; }
        public string state { get; set; }

        public string startMonth { get; set; }
        public string startYear { get; set; }
        public string endMonth { get; set; }
        public string endYear { get; set; }

        public IEnumerable<JobDetailDTO> details { get; set; }
    }
}
