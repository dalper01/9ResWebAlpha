using DataLayer.Entities.ResumeEntities;
using DataLayer.Entities.UserEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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

        public DbSet<SkillSet> SkillSets { get; set; }
        public DbSet<Skill> Skills { get; set; }

        public DbSet<Objective> Objectives { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Resume>().Property(r=>r.Id).HasColumnType("uniqueidentifier")
                .IsRequired().HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
    //.HasKey(i => i.uuid);


            modelBuilder.Entity<Jobs>()
                .HasRequired(j => j.Resume)
                .WithMany(r => r.jobs)
                .HasForeignKey(r => r.ResumeId);

            modelBuilder.Entity<JobDetails>()
                .HasRequired(j => j.Job)
                .WithMany(j => j.details)
                .HasForeignKey(j => j.JobId);

            modelBuilder.Entity<Skill>()
                .HasRequired(s => s.SkillSet)
                .WithMany(s => s.Skills)
                .HasForeignKey(s => s.SkillSetId);
        }
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
