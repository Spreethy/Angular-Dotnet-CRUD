using StudentCourseCRUD.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class StudentCourses
{
    [Key, Column(Order = 0)]
    public string StudentId { get; set; }

    [Key, Column(Order = 1)]
    public string CourseId { get; set; }

    public virtual Students Student { get; set; }
    public virtual Courses Course { get; set; }
}
