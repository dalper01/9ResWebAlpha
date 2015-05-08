using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace DataLayer.Entities.ResumeEntities
{
    public class Jobs
    {
        public int Id { get; set; }
        public string UserId { get; set; }

        public string firmLong { get; set; }  
        public string firmShort { get; set; }
        public string titleLong { get; set; }
        public string titleShort { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string startMonth { get; set; }
        public string startYear { get; set; }

        public virtual ICollection<JobDetails> details { get; set; }

        public Guid ResumeId { get; set; }

        [ForeignKey("ResumeId")]
        public virtual Resume Resume { get; set; }

    }
}
