import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MainComponent} from "./components/main/main.component";
import {RoleGuard} from "../auth/guards/role.guard";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {InstituteProfileComponent} from "./components/institute-profile/institute-profile.component";
import {ClassesComponent} from "./components/classes/classes.component";
import {TeachersComponent} from "./components/teachers/teachers.component";
import {StudentsComponent} from "./components/students/students.component";
import {ParentsComponent} from "./components/parents/parents.component";
import {AddClassComponent} from "./components/classes/add-class/add-class.component";
import {EditClassComponent} from "./components/classes/edit-class/edit-class.component";
import {AddTeacherComponent} from "./components/teachers/add-teacher/add-teacher.component";
import {EditTeacherComponent} from "./components/teachers/edit-teacher/edit-teacher.component";
import {ClassStudentsComponent} from "./components/classes/class-students/class-students.component";
import {AddParentComponent} from "./components/parents/add-parent/add-parent.component";
import {EditParentComponent} from "./components/parents/edit-parent/edit-parent.component";
import {AddStudentComponent} from "./components/students/add-student/add-student.component";
import {EditStudentComponent} from "./components/students/edit-student/edit-student.component";
import {ViewChildrenComponent} from "./components/parents/view-children/view-children.component";
import {ParentStudentsComponent} from "./components/parent-students/parent-students.component";
import {TeacherClassesComponent} from "./components/teachers/teacher-classes/teacher-classes.component";

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    canActivate: [RoleGuard],
    children: [
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "institute-profile",
        component: InstituteProfileComponent
      },
      {
        path: "classes",
        component: ClassesComponent
      },
      {
        path: "add-class",
        component: AddClassComponent
      },
      {
        path: "edit-class/:id",
        component: EditClassComponent
      },
      {
        path: "class-students/:id",
        component: ClassStudentsComponent
      },
      {
        path: "teachers",
        component: TeachersComponent
      },
      {
        path: "add-teacher",
        component: AddTeacherComponent
      },
      {
        path: "edit-teacher/:id",
        component: EditTeacherComponent
      },
      {
        path: "teacher-classes/:id",
        component: TeacherClassesComponent
      },
      {
        path: "students",
        component: StudentsComponent
      },
      {
        path: "add-student",
        component: AddStudentComponent
      },
      {
        path: "edit-student/:id",
        component: EditStudentComponent
      },
      {
        path: "parents",
        component: ParentsComponent
      },
      {
        path: "add-parent",
        component: AddParentComponent
      },
      {
        path: "edit-parent/:id",
        component: EditParentComponent
      },
      {
        path: "view-children/:id",
        component: ViewChildrenComponent
      },
      {
        path: "parent/students",
        component: ParentStudentsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
