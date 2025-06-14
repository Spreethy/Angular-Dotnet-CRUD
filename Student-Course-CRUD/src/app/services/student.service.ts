import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from './course.service';


export interface Student {
  studentId: string;
  name: string;
  email: string;
  dateofBirth: string;
  phoneNumber: string;
  address: string;
  assignedCourseIds: string[];
  courses: Course[];  
}

@Injectable({ providedIn: 'root' })
export class StudentService {
  private baseUrl = 'https://localhost:44331/api/students'

  students: Student[] = [];

  constructor(private http: HttpClient) {}


getStudents(): Observable<any[]> {
  return this.http.get<any[]>(this.baseUrl);
}


getStudent(id: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/${id}`);
}


  addStudent(student: any): Observable<any> {
    return this.http.post(this.baseUrl, student);
  }


  updateStudent(id: string, student: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/${id}`, student);
  }


  deleteStudent(id: string): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${id}`);
  }
 
}
