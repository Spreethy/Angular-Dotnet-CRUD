import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html'
})
export class StudentAddComponent {
  student: any = {
    Name: '',
    Email: '',
    DateofBirth: '',
    PhoneNumber: '',
    Address:'',
    AssignedCourseIds:[]
  };

  courses: any[] = [];
  errorMessage: string = '';
  constructor(private studentService: StudentService,private courseService: CourseService, private router: Router,private route: ActivatedRoute) {}

  ngOnInit(){
    this.loadCourses();

    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.studentService.getStudent(id).subscribe(data =>{
        this.student = data;
        this.student.AssignedCourseIds = data.StudentCourses?.map((sc:any)=> sc.CourseId) || [];
      });
    }
  }

  loadCourses(){
    this.courseService.getCourses().subscribe(data =>{
      this.courses = data;
    })
  }

    onCourseChange(courseId: string, isChecked: boolean){
      if(isChecked){
        if(!this.student.AssignedCourseIds.includes(courseId)){
          this.student.AssignedCourseIds.push(courseId);
        }else{
          this.student.AssignedCourseIds = this.student.AssignedCourseIds.filter((id: string) => id !== courseId);
        }
      }
    
    }
  // save() {
  //   this.errorMessage = '';
  //   this.studentService.addStudent(this.student).subscribe({
  //     next: () => {
  //        this.router.navigate(['/students']);
  //     },
  //     error: (err) => {
  //       if(err.status === 400){
  //         this.errorMessage = 'A student with this email already exists';
  //       } else{
  //         this.errorMessage = 'An unexpected error occured. Please try again';
  //       }
  //     }

  save(form: NgForm) {
  this.errorMessage = '';

  if (form.invalid) {
    this.errorMessage = 'Please fill all required fields correctly.';
    return; // stop submission
  }

  this.studentService.addStudent(this.student).subscribe({
    next: () => {
       this.router.navigate(['/students']);
    },
    error: (err) => {
      if (err.status === 400) {
        this.errorMessage = 'A student with this email already exists';
      } else {
        this.errorMessage = 'An unexpected error occurred. Please try again';
      }
    }
  });
}

     
    
  
}
