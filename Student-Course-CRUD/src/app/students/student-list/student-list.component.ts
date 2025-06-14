
import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { CourseService } from 'src/app/services/course.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html'
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  coursesMap: { [id: string]: string } = {}; 

  constructor(
    private studentService: StudentService,
    private courseService: CourseService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => {
      courses.forEach((course: any) => {
        this.coursesMap[course.courseId] = course.courseName;
      });

      this.fetchStudents();
    }, error => {
      console.error('Error loading courses:', error);
      this.fetchStudents();
    });
  }

  fetchStudents() {
    this.studentService.getStudents().subscribe(data => {
      console.log('Students from API:', data);
      this.students = data;
    }, error => {
      console.error('Error loading students:', error);
    });
  }

  deleteStudent(id: string) {
    if (confirm('Are you sure to delete?')) {
      this.studentService.deleteStudent(id).subscribe(() => {
        this.fetchStudents();
      });
    }
  }

  view(id: string) {
    this.router.navigate(['/students/view', id]);
  }

  edit(id: string) {
    this.router.navigate(['/students/edit', id]);
  }

  getCourseNames(student: any): string {
    if (!student.assignedCourseIds || student.assignedCourseIds.length === 0) {
      return 'No courses';
    }
    return student.assignedCourseIds
      .map((id: string) => this.coursesMap[id] || id)  
      .join(', ');
  }
}

