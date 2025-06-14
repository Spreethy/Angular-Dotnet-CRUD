using StudentCourseCRUD.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace StudentCourseCRUD.Controllers
{
    [RoutePrefix("api/studentcourse")]
    public class StudentCoursesController : ApiController
    {
        private StudentContext db = new StudentContext();

        // POST api/studentcourse/assign
        [HttpPost]
        [Route("assign")]
        public IHttpActionResult AssignCourse(string studentId, string courseId)
        {
            if (db.StudentCourses.Any(sc => sc.StudentId == studentId && sc.CourseId == courseId))
                return BadRequest("Course already assigned to student.");

            var studentCourses = new StudentCourses { StudentId = studentId, CourseId = courseId };
            db.StudentCourses.Add(studentCourses);
            db.SaveChanges();

            return Ok(studentCourses);
        }

        // DELETE api/studentcourse/remove?studentId=xxx&courseId=yyy
        [HttpDelete]
        [Route("remove")]
        public IHttpActionResult RemoveCourse(string studentId, string courseId)
        {
            var entry = db.StudentCourses.FirstOrDefault(sc => sc.StudentId == studentId && sc.CourseId == courseId);
            if (entry == null)
                return NotFound();

            db.StudentCourses.Remove(entry);
            db.SaveChanges();

            return Ok();
        }

        // GET api/studentcourse
        [HttpGet]
        [Route("")]
        public IEnumerable<StudentCourses> GetAllEnrollments()
        {
            return db.StudentCourses.ToList();
        }
    }
}
