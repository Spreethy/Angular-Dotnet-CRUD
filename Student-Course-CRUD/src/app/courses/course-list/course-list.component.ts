
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';
import { StudentService, Student } from 'src/app/services/student.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
})
export class CourseListComponent implements OnInit {
  courses: any[] = [];
  students: Student[] = [];
  filteredCourses: any[] =[];

  searchName: string = '';
  searchId: string = '';

  courseToDelete: any = null;

  modalInstance: any = null;



  
  constructor(
    private toastr: ToastrService,
    private courseService: CourseService,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();

    const modalElement = document.getElementById('confirmDeleteModal');
    if(modalElement){
      this.modalInstance = new (window as any).bootstrap.Modal(modalElement);
    }
  }


  loadData() {
    this.studentService.getStudents().subscribe(students => {
      this.students = students;

      this.courseService.getCourses().subscribe(courses => {
        this.courses = courses;
        this.filteredCourses = courses;
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

 applyFilter(){
  const nameFilter = this.searchName.trim().toLowerCase();
  const idFilter = this.searchId.trim().toLowerCase();

  this.filteredCourses = this.courses.filter(course => {
    const matchesName = !nameFilter || course.courseName.toLowerCase().includes(nameFilter);
    const matchesId = !idFilter || course.courseId.toLowerCase().includes(idFilter);
    return matchesName && matchesId;
  })
 }

 deleteCourse(course: any){
  this.courseToDelete = course;

  const modalElement = document.getElementById('confirmDeleteModal');
  if(modalElement){
    this.modalInstance = new (window as any).bootstrap.Modal(modalElement);
    this.modalInstance?.show();
  }
  


  }

 

confirmDelete() {
  const id = this.courseToDelete?.courseId;
  if (!id) return;

  this.courseService.deleteCourse(id).subscribe({
    next: () => {
      this.modalInstance?.hide();
      this.toastr.success('Course deleted successfully!', 'Success');
      this.loadData();

     
    },
    error: (error) => {
      this.modalInstance?.hide();
      if (error.status === 409) {
        this.toastr.warning('This course is assigned to students and cannot be deleted.');
      } else {
        this.toastr.error('Error deleting course.', 'Error');
      }
    }
  });
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
