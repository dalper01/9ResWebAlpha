using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace DataLayer.Entities.ResumeEntities
{
    public class JobDetails
    {
        public int Id { get; set; }
        public string description { get; set; }
        public int order { get; set; }

        public int JobId { get; set; }
        [ForeignKey("JobId")]
        public virtual Jobs Job { get; set; }

    }
}
