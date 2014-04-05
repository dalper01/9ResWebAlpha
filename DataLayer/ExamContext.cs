using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace DataLayer
{
    public class ExamContext : DbContext
    {
        public ExamContext()
            : base("name=ExamContext")
        {
        }

        public DbSet<Exam> Exam { get; set; }
        public DbSet<Test> Test { get; set; }
        public DbSet<UserTest> UserTest { get; set; }

    }
}
