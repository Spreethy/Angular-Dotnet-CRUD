
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { CourseService } from 'src/app/services/course.service'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html'
})
export class StudentEditComponent implements OnInit {
  id: string = '';
  student: any = {
    assignedCourseIds: []
  };

  courses: any[] = [];  
  errorMessage: string = '';

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private courseService: CourseService,  
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.loadCourses();

    this.studentService.getStudent(this.id).subscribe(data => {
      this.student = data;

      if(this.student.dateofBirth){
        const dob = new Date(this.student.dateofBirth);
        this.student.dateofBirth = dob.toISOString().substring(0,10);
      }

      this.student.assignedCourseIds = data.assignedCourseIds ? data.assignedCourseIds.map(String) : [];

      console.log('Normalized assignedCourseIds:', this.student.assignedCourseIds);
    });
  }

  loadCourses() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  onCourseChange(courseId: string, isChecked: boolean) {
    if (isChecked) {
      if (!this.student.assignedCourseIds.includes(courseId)) {
        this.student.assignedCourseIds.push(courseId);
      }
    } else {
      this.student.assignedCourseIds = this.student.assignedCourseIds.filter((id: string) => id !== courseId);
    }
  }

  update() {
    this.errorMessage = '';
     console.log('Sending student:', this.student);
    this.studentService.updateStudent(this.id, this.student).subscribe({
      next: () => {
      this.router.navigate(['/students']);
      },
      error: (err) => {
        if(err.error && typeof err.error === 'string'){
          this.toastr.error( err.error);
        }else{
          this.toastr.error( 'An unexpected error occured.');
        }
        console.error('Updated error:', err);
      }
    });
  }
}
