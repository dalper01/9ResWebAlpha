﻿using Res.DTOs.Abstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace _9ResWeb.Models
{
    public class JobDetailViewModel : EntityBase
    {
        public int Id { get; set; }
        public string description { get; set; }
        public int order { get; set; }
    }
}
