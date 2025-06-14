import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html'
})
export class StudentViewComponent implements OnInit {
  id: string = '';
  student: any;

  constructor(private route: ActivatedRoute, private studentService: StudentService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.studentService.getStudent(this.id).subscribe(data => {
      this.student = data;
    });
  }
}
