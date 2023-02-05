import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MainComponent} from "./components/main/main.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {SchoolsComponent} from "./components/schools/schools.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {EditSchoolComponent} from "./components/schools/edit-school/edit-school.component";
import {AddSchoolComponent} from "./components/schools/add-school/add-school.component";
import {RoleGuard} from "../auth/guards/role.guard";
import {AuthGuard} from "../auth/guards/auth.guard";
import {
  AddSystemAdminUsersComponent
} from "./components/system-admin-users/add-system-admin-users/add-system-admin-users.component";
import {
  EditSystemAdminUsersComponent
} from "./components/system-admin-users/edit-system-admin-users/edit-system-admin-users.component";
import {SystemAdminUsersComponent} from "./components/system-admin-users/system-admin-users.component";

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    canActivate: [RoleGuard],
    children: [

      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "schools",
        component: SchoolsComponent,
        canActivate: [AuthGuard]
      },{
        path: 'editSchool/:id',
        component: EditSchoolComponent,
        canActivate: [AuthGuard]
      },{
        path: 'addSchool',
        component: AddSchoolComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "admin-users",
        component: SystemAdminUsersComponent,
        canActivate: [AuthGuard]
      },{
        path: 'edit-admin-users/:id',
        component: EditSystemAdminUsersComponent,
        canActivate: [AuthGuard]
      },{
        path: 'add-admin-users',
        component: AddSystemAdminUsersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "**",
        redirectTo: "/dashboard",
      },
    ]
  }, {
    path: "**",
    redirectTo: "/dashboard",
  },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
