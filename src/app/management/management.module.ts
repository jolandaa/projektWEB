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
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from "@angular/material/select";
import {CommonModule} from "@angular/common";

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
    CommonModule,
    ManagementRoutingModule,
    CoreModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
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
export class ManagementModule {}
