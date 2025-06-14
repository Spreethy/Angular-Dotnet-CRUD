import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


export interface Course {
  courseId: string;
  courseName: string;
  credits: number;
  studentCount?: number;
  studentIds?: string[];
}


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'https://localhost:44331/api/courses';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl);
  }


getCourse(id: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/${id}`);
}


  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.baseUrl, course);
  }

  updateCourse(id: string, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/${id}`, course);
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
