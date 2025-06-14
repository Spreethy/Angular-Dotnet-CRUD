using System.Data.Entity;
using StudentCourseCRUD.Models;

namespace StudentCourseCRUD.Models
{
    public class StudentContext : DbContext
    {
        public StudentContext(): base("name=StudentCourseConnectionString") { }

        public DbSet<Students> Students { get; set; }
        public DbSet<Courses> Courses { get; set; }
        public DbSet<StudentCourses> StudentCourses { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StudentCourses>()
                .HasKey(sc => new { sc.StudentId, sc.CourseId });

            base.OnModelCreating(modelBuilder);
        }
    }
}