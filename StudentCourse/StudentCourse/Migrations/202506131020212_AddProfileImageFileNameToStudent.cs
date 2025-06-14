namespace StudentCourse.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddProfileImageFileNameToStudent : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Students", "ProfileImageFileName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Students", "ProfileImageFileName");
        }
    }
}
