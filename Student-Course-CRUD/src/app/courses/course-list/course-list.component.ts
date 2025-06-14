
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';
import { StudentService, Student } from 'src/app/services/student.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
})
export class CourseListComponent implements OnInit {
  courses: any[] = [];
  students: Student[] = [];

  
  constructor(
    private courseService: CourseService,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }


  loadData() {
    this.studentService.getStudents().subscribe(students => {
      this.students = students;

      this.courseService.getCourses().subscribe(courses => {
        this.courses = courses;
        console.log('Courses:', this.courses);
        console.log('Students:', this.students);
      });
    });
  }

  getEnrolledCount(courseId: string): number {
    return this.students.filter(student =>
      student.assignedCourseIds?.includes(courseId)
    ).length;
  }

  // deleteCourse(course: any) {
  //   const id = course.courseId;
  //   if (!id) {
  //     console.error('deleteCourse called with undefined ID!');
  //     return;
  //   }
  //   if (confirm('Are you sure to delete this course?')) {
  //     this.courseService.deleteCourse(id).subscribe(() => {
  //       this.loadData();
  //     });
  //   }
  // }

  deleteCourse(course: any) {
    const id = course?.courseId;
    if (!id) {
      console.error('deleteCourse called with invalid ID!');
      return;
    }

    if (confirm('Are you sure to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe({
        next: () => {
          this.loadData();
        },
        error: (error) => {
          if (error.status === 409) {
            alert('This course is assigned to students and cannot be deleted.');
          } else {
            alert('Error deleting course: ' + (error.error || error.message || error.statusText));
          }
        }
      });
    }
  }

  view(id: string) {
    if (!id) {
      console.error('view called with undefined ID!');
      return;
    }
    this.router.navigate(['/courses/view', id]);
  }

  edit(id: string) {
    if (!id) {
      console.error('edit called with undefined ID!');
      return;
    }
    this.router.navigate(['/courses/edit', id]);
  }
}
