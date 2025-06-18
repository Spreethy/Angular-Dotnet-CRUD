import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html'
})
export class CourseAddComponent {
  course: any = {
    courseName: '',
    credits: 0
  };
  errorMessage: string ='';
  constructor(private toastr: ToastrService, private courseService: CourseService, private router: Router) {}

  
  save() {
  this.errorMessage = '';

  if (this.course.credits < 1) {
    this.toastr.error('Credits must be at least 1.');
    return;  
  }

  this.courseService.addCourse(this.course).subscribe({
    next: () => {
      this.router.navigate(['/courses']);
    },
    error: (err) => {
      if (err.status === 400) {
        this.toastr.error('A course with this name already exists');
      } else {
        this.toastr.error('An unexpected error occurred. Please try again');
      }
    }
  });
}

}
