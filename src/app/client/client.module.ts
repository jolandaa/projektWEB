import {NgModule} from "@angular/core";
import {ClientRoutingModule} from "./client-routing.module";
import { MainComponent } from './components/main/main.component';
import { ClientSidebarComponent } from './components/client-sidebar/client-sidebar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {CoreModule} from "../core/core.module";
import {MatDividerModule} from "@angular/material/divider";
import { InstituteProfileComponent } from './components/institute-profile/institute-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClassesComponent } from './components/classes/classes.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { StudentsComponent } from './components/students/students.component';
import { ParentsComponent } from './components/parents/parents.component';
import {CommonModule} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import { AddClassComponent } from './components/classes/add-class/add-class.component';
import { EditClassComponent } from './components/classes/edit-class/edit-class.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AddTeacherComponent } from './components/teachers/add-teacher/add-teacher.component';
import { EditTeacherComponent } from './components/teachers/edit-teacher/edit-teacher.component';
import {MatSelectModule} from "@angular/material/select";
import { ClassStudentsComponent } from './components/classes/class-students/class-students.component';
import { AddParentComponent } from './components/parents/add-parent/add-parent.component';
import { EditParentComponent } from './components/parents/edit-parent/edit-parent.component';
import { AddStudentComponent } from './components/students/add-student/add-student.component';
import { EditStudentComponent } from './components/students/edit-student/edit-student.component';
import { ViewChildrenComponent } from './components/parents/view-children/view-children.component';
import { ParentStudentsComponent } from './components/parent-students/parent-students.component';
import { TeacherClassesComponent } from './components/teachers/teacher-classes/teacher-classes.component';

@NgModule({
  declarations: [
    MainComponent,
    ClientSidebarComponent,
    InstituteProfileComponent,
    DashboardComponent,
    ClassesComponent,
    TeachersComponent,
    StudentsComponent,
    ParentsComponent,
    AddClassComponent,
    EditClassComponent,
    AddTeacherComponent,
    EditTeacherComponent,
    ClassStudentsComponent,
    AddParentComponent,
    EditParentComponent,
    AddStudentComponent,
    EditStudentComponent,
    ViewChildrenComponent,
    ParentStudentsComponent,
    TeacherClassesComponent
  ],
    imports: [
        CommonModule,
        ClientRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatSidenavModule,
        CoreModule,
        MatDividerModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        MatSelectModule,
    ],
  providers: [

  ]
})
export class ClientModule {}
