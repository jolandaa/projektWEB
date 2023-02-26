import { Component, OnInit } from '@angular/core';
import {AdminDashboard, DashboardService, SystemAdminDashboard} from "../../../core/services/dashboard.service";
import {ApiResponseModel} from "../../../shared/models/api-response.model";
import {User, UserRoles} from "../../../shared/models/login-user.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  adminDashboardData:AdminDashboard = {}
  parentDashboardData:AdminDashboard = {}

  loggedUser!: User;
  userRoles = UserRoles;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
    if (this.loggedUser.role === this.userRoles.Admin) {
      this.getSystemAdminDashboard();
    } else if (this.loggedUser.role === this.userRoles.Teacher) {
      this.getTeacherDashboard();
    } else {
      this.getParentDashboard()
    }
  }


  getSystemAdminDashboard() {
    this.dashboardService.getAdminDashboard(this.loggedUser.school_id).subscribe((res: ApiResponseModel) => {
      if (res.success) {
        this.adminDashboardData = res.data;
      }
    })
  }

  getTeacherDashboard() {

  }

  getParentDashboard() {
    this.dashboardService.getParentDashboard(this.loggedUser.parent_profile?.parent_id).subscribe((res: ApiResponseModel) => {
      if (res.success) {
        this.parentDashboardData = res.data;
      }
    })
  }

}
