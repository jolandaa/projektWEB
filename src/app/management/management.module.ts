import {NgModule} from "@angular/core";
import {ManagementRoutingModule} from "./management-routing.module";
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {CoreModule} from "../core/core.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { SchoolsComponent } from './components/schools/schools.component';
import { ProfileComponent } from './components/profile/profile.component';
import {MatTableModule} from "@angular/material/table";
import { EditSchoolComponent } from './components/schools/edit-school/edit-school.component';
import { AddSchoolComponent } from './components/schools/add-school/add-school.component';
import {ConfirmModalComponent} from "../shared/modals/confirm-modal";
import {MatDialogModule} from "@angular/material/dialog";
import { SystemAdminUsersComponent } from './components/system-admin-users/system-admin-users.component';
import { AddSystemAdminUsersComponent } from './components/system-admin-users/add-system-admin-users/add-system-admin-users.component';
import { EditSystemAdminUsersComponent } from './components/system-admin-users/edit-system-admin-users/edit-system-admin-users.component';

@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    SchoolsComponent,
    ProfileComponent,
    EditSchoolComponent,
    AddSchoolComponent,
    ConfirmModalComponent,
    SystemAdminUsersComponent,
    AddSystemAdminUsersComponent,
    EditSystemAdminUsersComponent
  ],
  imports: [
    ManagementRoutingModule,
    CoreModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
  ],
  providers: [

  ]
})
export class ManagementModule {}
