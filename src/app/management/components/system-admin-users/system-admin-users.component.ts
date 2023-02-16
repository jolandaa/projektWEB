import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmModalComponent} from "../../../shared/modals/confirm-modal";
import {AdminUsersService} from "../../services/admin-users.service";
import {SystemAdminUsersModel} from "../../models/system-admin-users.model";

@Component({
  selector: 'app-system-admin-users',
  templateUrl: './system-admin-users.component.html',
  styleUrls: ['./system-admin-users.component.scss']
})
export class SystemAdminUsersComponent implements OnInit {

  displayedColumns: string[] = ['user_id', 'username', 'first_name', 'last_name', 'email', 'role', 'status', 'actions'];
  dataSource!: SystemAdminUsersModel[];

  constructor(private adminUsersService: AdminUsersService,
              private dialog: MatDialog) { }

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
        cancelText: 'I18N.DISCARD'
      },
      autoFocus: false,
      panelClass: 'app-modal'
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res === 'submit') {
        this.adminUsersService.deleteUser(user_id).subscribe(res => {
          if (res.success === 1) {
            this.getUsersList();
          } else {

          }
        })
      }
    })
  }

}
