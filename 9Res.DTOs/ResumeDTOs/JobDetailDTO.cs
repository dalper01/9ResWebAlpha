using Res.DTOs.Abstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Res.DTOs.ResumeDTOs
{
    public class JobDetailDTO : EntityBase
    {
        public int Id { get; set; }
        public string description { get; set; }
        public int order { get; set; }
    }
}
