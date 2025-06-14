import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService, Course } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html'
})
export class CourseEditComponent implements OnInit {
  id: string = '';
  course: Course = {
    courseId: '',
    courseName: '',
    credits: 0
  };

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.courseService.getCourse(this.id).subscribe({
      next: (data) => {
        console.log('Fetched course:', data);
        this.course = data;
      },
      error: (err) => {
        console.error('Failed to load course:', err);
      }
    });
  }

  update() {
    this.courseService.updateCourse(this.id, this.course).subscribe({
      next: () => {
        console.log('Course updated');
        this.router.navigate(['/courses']);
      },
      error: (err) => {
        console.error('Update failed:', err);
      }
    });
  }
}
