import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmModalComponent} from "../../../shared/modals/confirm-modal";
import {AdminUsersService} from "../../services/admin-users.service";
import {SystemAdminUsersModel} from "../../models/system-admin-users.model";
import {AppEvents} from "../../../app-events.service";
import {ApiResponseModel} from "../../../shared/models/api-response.model";

@Component({
  selector: 'app-system-admin-users',
  templateUrl: './system-admin-users.component.html',
  styleUrls: ['./system-admin-users.component.scss']
})
export class SystemAdminUsersComponent implements OnInit {

  displayedColumns: string[] = ['user_id', 'username', 'first_name', 'last_name', 'email', 'role', 'created_date', 'status', 'actions'];
  dataSource!: SystemAdminUsersModel[];

  constructor(private adminUsersService: AdminUsersService,
              private dialog: MatDialog,
              private appEvents: AppEvents) { }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.adminUsersService.getAdminUsersList(2).subscribe(res => {
      if (res?.success === 1) {
        this.dataSource = res.list;
      }
    })
  }

  deleteUser(user_id: string) {
    let dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        cancelText: 'Discard',
        title: "Delete user",
        message: "Are you sure deleting this user?"
      },
      autoFocus: false,
      panelClass: 'app-modal'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === 'submit') {
        this.adminUsersService.deleteUser(user_id).subscribe((res: ApiResponseModel) => {
          if (res.success === 1) {
            this.getUsersList();
            this.appEvents.showSuccessToast(res.message || 'You have successfully deleted this user.')
          }
        })
      }
    })
  }

}
