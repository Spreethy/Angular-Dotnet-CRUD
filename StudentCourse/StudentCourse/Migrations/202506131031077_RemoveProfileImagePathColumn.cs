namespace StudentCourse.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemoveProfileImagePathColumn : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Students", "ProfileImageFileName");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Students", "ProfileImageFileName", c => c.String());
        }
    }
}
