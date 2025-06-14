namespace StudentCourse.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateStudentAndCourseModels : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Courses", "CourseName", c => c.String(nullable: false, maxLength: 100));
            AlterColumn("dbo.Students", "Email", c => c.String(nullable: false, maxLength: 100));
            CreateIndex("dbo.Courses", "CourseName", unique: true);
            CreateIndex("dbo.Students", "Email", unique: true);
        }
        
        public override void Down()
        {
            DropIndex("dbo.Students", new[] { "Email" });
            DropIndex("dbo.Courses", new[] { "CourseName" });
            AlterColumn("dbo.Students", "Email", c => c.String());
            AlterColumn("dbo.Courses", "CourseName", c => c.String());
        }
    }
}
