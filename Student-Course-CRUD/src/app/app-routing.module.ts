import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentAddComponent } from './students/student-add/student-add.component';
import { StudentEditComponent } from './students/student-edit/student-edit.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseAddComponent } from './courses/course-add/course-add.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { StudentViewComponent } from './students/student-view/student-view.component';
import { CourseViewComponent } from './courses/course-view/course-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentListComponent },
  { path: 'students/add', component: StudentAddComponent },
  { path: 'students/edit/:id', component: StudentEditComponent },
  { path: 'students/view/:id', component: StudentViewComponent},
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/add', component: CourseAddComponent },
  { path: 'courses/edit/:id', component: CourseEditComponent },
  { path: 'courses/view/:id', component:CourseViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
