using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudentCourseCRUD.Models
{
    public class Students
    {

        [Key]
        public string StudentId { get; set; }
        public string Name { get; set; }

        [Required]
        [Index(IsUnique = true)]
        [StringLength(100)]
        public string Email { get; set; }

        public DateTime DateofBirth {  get; set; }
        public string PhoneNumber { get; set; }

        public string Address { get; set; }

        

        [NotMapped]
        public List<string> assignedCourseIds { get; set; }

        [JsonIgnore]
        public virtual ICollection<StudentCourses> StudentCourses { get; set; }
    }
}