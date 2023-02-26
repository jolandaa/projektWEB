import { Component, OnInit } from '@angular/core';
import {SchoolModel} from "../../../management/models/school-list.model";
import {User} from "../../../shared/models/login-user.model";
import {TeachersService} from "../../services/teachers.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmModalComponent} from "../../../shared/modals/confirm-modal";
import {ParentsService} from "../../services/parents.service";
import {AppEvents} from "../../../app-events.service";
import {ApiResponseModel} from "../../../shared/models/api-response.model";

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.scss']
})
export class ParentsComponent implements OnInit {

  displayedColumns: string[] = ['parent_id', 'first_name', 'last_name', 'email' ,'view_children','actions'];
  dataSource!: any[];
  loggedUser!: User;

  constructor(private parentsService: ParentsService,
              private dialog: MatDialog,
              private appEvents: AppEvents) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
    this.getParentList();
  }

  getParentList() {
    this.parentsService.getParentList(this.loggedUser.school_id).subscribe(res => {
      if (res?.success === 1) {
        this.dataSource = res.list;
      }
    })
  }

  deleteParent(parent_id: string,user_id: string) {
    let dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        cancelText: 'Discard',
        title: "Delete parent",
        message: "Are you sure deleting this parent?"
      },
      autoFocus: false,
      panelClass: 'app-modal'
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res === 'submit') {
        this.parentsService.deleteParent(parent_id, user_id).subscribe((res: ApiResponseModel) => {
          if (res.success === 1) {
            this.getParentList();
            this.appEvents.showSuccessToast(res.message || 'You have successfully deleted this parent.')
          }
        })
      }
    })
  }

}
