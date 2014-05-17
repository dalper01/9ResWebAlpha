using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer
{
    public class ResumeContext : DbContext
    {
        public ResumeContext()
            : base("name=ResumeContext") 
        {
            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.ProxyCreationEnabled = false;
            this.Configuration.AutoDetectChangesEnabled = true;

            Database.SetInitializer(
                new MigrateDatabaseToLatestVersion<ResumeContext, ResumeMigrationsConfiguration>());
        }

        public DbSet<Resume> Resume { get; set; }

        public DbSet<Highschools> Highschools { get; set; }
        public DbSet<Colleges> Colleges { get; set; }
        public DbSet<Certifications> Certifications { get; set; }

        public DbSet<Jobs> Jobs { get; set; }
        public DbSet<JobDetails> JobDetails { get; set; }
    }

    class ResumeMigrationsConfiguration : DbMigrationsConfiguration<ResumeContext>
    {
        public ResumeMigrationsConfiguration()
        {
            this.AutomaticMigrationDataLossAllowed = true;
            this.AutomaticMigrationsEnabled = true;
        }
    }
}
