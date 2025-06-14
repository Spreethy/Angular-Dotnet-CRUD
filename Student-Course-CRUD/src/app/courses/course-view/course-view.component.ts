import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
})
export class CourseViewComponent implements OnInit {
  courseId!: string;
  course: any;

  constructor(private route: ActivatedRoute, private courseService: CourseService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id')!;  
      console.log('Viewing course ID:', this.courseId);

      this.courseService.getCourse(this.courseId).subscribe({
        next: (course) => {
          this.course = course;
          console.log('Course data:', this.course);
        },
        error: (err) => console.error(err)
      });
    });
  }
}
