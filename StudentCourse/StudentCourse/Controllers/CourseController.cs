
using StudentCourseCRUD.Models;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;

namespace StudentCourseCRUD.Controllers
{
    [RoutePrefix("api/courses")]
    public class CoursesController : ApiController
    {
        private StudentContext db = new StudentContext();

        // GET: api/courses
        [HttpGet]
        [Route("")]
        public IEnumerable<Courses> GetCourses() => db.Courses.ToList();


        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult GetCourse(string id)
        {
            var course = db.Courses
                .Include(c => c.StudentCourses.Select(sc => sc.Student)) 
                .FirstOrDefault(c => c.CourseId == id);

            if (course == null)
                return NotFound();

            var result = new
            {
                CourseId = course.CourseId,
                CourseName = course.CourseName,
                Credits = course.Credits,
                StudentCount = course.StudentCourses.Count,
                StudentIds = course.StudentCourses.Select(sc => sc.Student.StudentId).ToList()
            };

            return Ok(result); 
        }


        // POST: api/courses
        [HttpPost]
        [Route("")]
        public IHttpActionResult AddCourse(Courses course)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var lastCourse = db.Courses.OrderByDescending(c => c.CourseId).FirstOrDefault();
            string lastId = lastCourse?.CourseId;

            if (db.Courses.Any(c => c.CourseName == course.CourseName))
            {
                return BadRequest("Course with this name already exists.");
            }


            course.CourseId = IdGenerator.GenerateId(lastId, "CSE");

            db.Courses.Add(course);
            db.SaveChanges();

            return Ok(course);
        }

        // PUT: api/courses/CSE0001
        [HttpPut]
        [Route("{id}")]
        public IHttpActionResult UpdateCourse(string id, Courses updatedCourse)
        {
            if (updatedCourse == null)
                return BadRequest("Course data is null.");

            var course = db.Courses.FirstOrDefault(c => c.CourseId == id);
            if (course == null)
                return NotFound();

            course.CourseName = updatedCourse.CourseName;
            course.Credits = updatedCourse.Credits;
            db.SaveChanges();

            return Ok(course);
        }

        // DELETE: api/courses/CSE0001
        [HttpDelete]
        [Route("{id}")]
        public IHttpActionResult DeleteCourse(string id)
        {
            var course = db.Courses.Find(id);
            if (course == null)
                return NotFound();

            bool hasStudents = db.StudentCourses.Any(sc => sc.CourseId == id);
            if (hasStudents)
                return Content(System.Net.HttpStatusCode.Conflict, "Course is assigned to students.");

            db.Courses.Remove(course);
            db.SaveChanges();
            return Ok();
        }
    }
}
