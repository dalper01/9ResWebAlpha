using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Res.DTOs.ResumeDTOs
{
    public class SkillSetDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public IEnumerable<SkillDTO> Skills { get; set; }
    }

    public class SkillDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
