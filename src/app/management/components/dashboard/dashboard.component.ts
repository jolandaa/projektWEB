import { Component, OnInit } from '@angular/core';
import {DashboardService, SystemAdminDashboard} from "../../../core/services/dashboard.service";
import {ApiResponseModel} from "../../../shared/models/api-response.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  systemAdminDashboard:SystemAdminDashboard = {}
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getSystemAdminDashboard();
  }


  getSystemAdminDashboard() {
    this.dashboardService.getSystemAdminDashboard().subscribe((res: ApiResponseModel) => {
      if (res.success) {
        this.systemAdminDashboard = res.data;
      }
    })
  }

}
