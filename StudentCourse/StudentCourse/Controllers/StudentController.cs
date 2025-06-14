using StudentCourseCRUD.Models;

using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;

namespace StudentCourseCRUD.Controllers
{
    [RoutePrefix("api/students")]
    public class StudentsController : ApiController
    {
        private StudentContext db = new StudentContext();

       

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetStudent()
        {
            var students = db.Students.Include("StudentCourses.Course").ToList();

            var result = students.Select(s => new
            {
                s.StudentId,
                s.Name,
                s.Email,
                s.DateofBirth,
                s.PhoneNumber,
                s.Address,
                //assignedCourseIds = s.StudentCourses.Select(sc => sc.CourseId).ToList(),
                assignedCourseIds = s.StudentCourses.Select(sc => sc.CourseId.ToString()).ToList(),

                Courses = s.StudentCourses.Select(sc => new
                {
                    sc.Course.CourseId,
                    sc.Course.CourseName
                }).ToList()
            });

            return Ok(result);
        }



        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult GetStudent(string id)
        {
            var student = db.Students
                .Include(s => s.StudentCourses.Select(sc => sc.Course))
                .FirstOrDefault(s => s.StudentId == id);

            if (student == null) return NotFound();

            var result = new
            {
                student.StudentId,
                student.Name,
                student.Email,
                student.DateofBirth,
                student.PhoneNumber,
                student.Address,
                assignedCourseIds = student.StudentCourses.Select(sc => sc.CourseId.ToString()).ToList(),

                Courses = student.StudentCourses.Select(sc => new
                {
                    sc.Course.CourseId,
                    sc.Course.CourseName
                }).ToList()
            };

            return Ok(result);
        }



        [HttpPost]
        [Route("")]
        public IHttpActionResult AddStudent(Students student)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var lastStudent = db.Students.OrderByDescending(s => s.StudentId).FirstOrDefault();
            string lastId = lastStudent?.StudentId;

            if (db.Students.Any(s => s.Email == student.Email))
            {
                return BadRequest("Student with this email already exists.");
            }

            student.StudentId = IdGenerator.GenerateId(lastId, "STU");
            db.Students.Add(student);
            db.SaveChanges();

            if (student.assignedCourseIds != null)
            {
                foreach (var courseId in student.assignedCourseIds)
                {
                    db.StudentCourses.Add(new StudentCourses
                    {
                        StudentId = student.StudentId,
                        CourseId = courseId
                    });
                }
                db.SaveChanges();
            }

            return Ok(student);
        }



        [HttpPut]
        [Route("{id}")]
        public IHttpActionResult UpdateStudent(string id, Students updatedStudent)
        {
            var student = db.Students.Find(id);
            if (student == null) return NotFound();

            student.Name = updatedStudent.Name;
            student.Email = updatedStudent.Email;
            student.DateofBirth = updatedStudent.DateofBirth;
            student.PhoneNumber = updatedStudent.PhoneNumber;
            student.Address = updatedStudent.Address;

            var oldAssignments = db.StudentCourses.Where(sc => sc.StudentId == id);
            db.StudentCourses.RemoveRange(oldAssignments);
            db.SaveChanges(); 

            if (updatedStudent.assignedCourseIds != null)
            {
                foreach (var courseId in updatedStudent.assignedCourseIds)
                {
                    db.StudentCourses.Add(new StudentCourses
                    {
                        StudentId = id,
                        CourseId = courseId
                    });
                }
            }

            db.SaveChanges(); 
            return Ok(student);
        }

        [HttpDelete]
        [Route("{id}")]
        public IHttpActionResult DeleteStudent(string id)
        {
            var student = db.Students.Find(id);
            if (student == null) return NotFound();

            db.Students.Remove(student);
            db.SaveChanges();
            return Ok();
        }

    }
}
