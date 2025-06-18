import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentAddComponent } from './students/student-add/student-add.component';
import { StudentEditComponent } from './students/student-edit/student-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseAddComponent } from './courses/course-add/course-add.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { StudentViewComponent } from './students/student-view/student-view.component';
import { CourseViewComponent } from './courses/course-view/course-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    
    NavbarComponent,
    StudentListComponent,
    StudentAddComponent,
    StudentEditComponent,
    CourseListComponent,
    CourseAddComponent,
    CourseEditComponent,
    StudentViewComponent,
    CourseViewComponent,
   
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass:'toast-center-center',
    }),
     BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
