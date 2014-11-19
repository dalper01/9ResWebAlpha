using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.Migrations;

namespace _9ResWeb.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public virtual UserInfo UserInfo { get; set; }
    }

    [Table("UserInfo")]
    public class UserInfo
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set; }

        public string ProfilePicture { get; set; }

        public virtual IEnumerable<UserEmail> UserEmails { get; set; }
    }

    [Table("UserEmails")]
    public class UserEmail
    {
        public int Id { get; set; }
        public string EmailAddress { get; set; }
        public bool Confirmed { get; set; }

    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("AuthenticationContext")
        {
            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.ProxyCreationEnabled = false;
            this.Configuration.AutoDetectChangesEnabled = true;

            Database.SetInitializer(
                new MigrateDatabaseToLatestVersion<ApplicationDbContext, AuthenticationMigrationsConfiguration>());
        }

        public DbSet<UserInfo> UserInfo  { get; set; }
        public DbSet<UserEmail> UserEmail  { get; set; }

    }

    class AuthenticationMigrationsConfiguration : DbMigrationsConfiguration<ApplicationDbContext>
    {
        public AuthenticationMigrationsConfiguration()
        {
            this.AutomaticMigrationDataLossAllowed = true;
            this.AutomaticMigrationsEnabled = true;
        }
    }

}