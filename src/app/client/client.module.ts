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

@NgModule({
  declarations: [
    MainComponent,
    ClientSidebarComponent,
    InstituteProfileComponent,
    DashboardComponent,
    ClassesComponent,
    TeachersComponent,
    StudentsComponent,
    ParentsComponent
  ],
  imports: [
    ClientRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CoreModule,
    MatDividerModule
  ],
  providers: [

  ]
})
export class ClientModule {}
