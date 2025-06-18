
import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { CourseService } from 'src/app/services/course.service'; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html'
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  filteredStudents: any[] = [];
  coursesMap: { [id: string]: string } = {}; 
  courseFilter: string ='';
  courses: any[] = [];

  searchName: string = '';
  searchEmail: string = '';
  searchId: string = '';

  modalInstance: any = null;
  studentToDeleteId: string | null = null;

  constructor(
    private toastr: ToastrService,
    private studentService: StudentService,
    private courseService: CourseService, 
    private router: Router
  ) {}

  ngOnInit(): void {

    const modalElement = document.getElementById('confirmDeleteModal');
    if(modalElement){
      this.modalInstance = new (window as any).bootstrap.Modal(modalElement);
    }
    this.courseService.getCourses().subscribe(courses => {
     this.courses = courses;
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
      this.applyFilter();
    }, error => {
      console.error('Error loading students:', error);
    });
  }

  applyFilter(){
    const courseValue = this.courseFilter.trim().toLowerCase();
    const nameValue = this.searchName.trim().toLowerCase();
    const emailValue = this.searchEmail.trim().toLowerCase();
    const idValue = this.searchId.trim().toLowerCase();

      this.filteredStudents = this.students.filter(student => {
        const courseNames = (student.assignedCourseIds || [])
        .map((id: string) => this.coursesMap[id]?.toLowerCase() || '')
        .join(',');

        const matchesCourse = !courseValue || courseNames.includes(courseValue);
        const matchesName = !nameValue || student.name?.toLowerCase().includes(nameValue);
        const matchesEmail = !emailValue || student.email?.toLowerCase().includes(emailValue);
        const matchesId = !idValue || student.studentId?.toLowerCase().includes(idValue);

        return matchesCourse && matchesName && matchesEmail && matchesId;

      });
    }
  

  deleteStudent(id: string) {

    this.studentToDeleteId = id;
    this.modalInstance?.show();
  }

  confirmDelete(){
    if(!this.studentToDeleteId) return;

    this.studentService.deleteStudent(this.studentToDeleteId).subscribe({
      next: () => {
        this.modalInstance?.hide();
        this.toastr.success('Student deleted successfully!', 'Success');
        this.fetchStudents();
        this.studentToDeleteId = null;
      },
      error: (error) =>{
        this.modalInstance?.hide();
        alert('Error deleting student');
        console.error(error);
      }

    })
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

