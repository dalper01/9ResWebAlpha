﻿using Res.DTOs.Abstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Res.DTOs.ResumeDTOs
{
    public class CertificationDTO : EntityBase
    {
        public int Id { get; set; }
        public string type { get; set; }
        public string Provider { get; set; }

        public bool completed { get; set; }
        public string compMonth { get; set; }
        public string compYear { get; set; }
    }
}
