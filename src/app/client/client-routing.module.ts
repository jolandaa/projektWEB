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
        path: "teacher/classes",
        component: ClassesComponent
      },
      {
        path: "admin/teachers",
        component: TeachersComponent
      },
      {
        path: "admin/students",
        component: StudentsComponent
      },
      {
        path: "admin/parents",
        component: ParentsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
