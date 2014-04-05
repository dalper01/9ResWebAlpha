using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Exam
    {
        //[Key]
        public int ExamId { get; set; }
        public int SubjectId { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Test> Tests { get; set; }
    }

    public class Test
    {
        public int TestId { get; set; }
        public int ExamId { get; set; }
        public string Title { get; set; }
        public virtual ICollection<UserTest> UserTests { get; set; }
    }

    public class UserTest
    {
        public int UserTestId { get; set; }
        public string UserId { get; set; }
        public int TestId { get; set; }
        public int QuestionsCount { get; set; }
    }

}
