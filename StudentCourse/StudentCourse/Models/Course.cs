using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudentCourseCRUD.Models
{
    public class Courses
    {
        [Key]
        public string CourseId { get; set; }

        [Required]
        [Index(IsUnique = true)]
        [StringLength(100)]
        public string CourseName { get; set; }

      
        public int Credits { get; set; }

        [JsonIgnore]
        public virtual ICollection<StudentCourses> StudentCourses { get; set; }

    }
}