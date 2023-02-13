import { Component, OnInit } from '@angular/core';
import {SchoolModel} from "../../../management/models/school-list.model";
import {User} from "../../../shared/models/login-user.model";
import {TeachersService} from "../../services/teachers.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmModalComponent} from "../../../shared/modals/confirm-modal";
import {ParentsService} from "../../services/parents.service";

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.scss']
})
export class ParentsComponent implements OnInit {

  displayedColumns: string[] = ['parent_id', 'first_name', 'last_name', 'email' ,'view_children','actions'];
  dataSource!: SchoolModel[];
  loggedUser!: User;

  constructor(private parentsService: ParentsService,
              private dialog: MatDialog) { }

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

  deleteTeacher(teacher_id: string,user_id: string) {
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
        this.parentsService.deleteParent(teacher_id, user_id).subscribe(res => {
          if (res.success === 1) {
            this.getParentList();
          } else {

          }
        })
      }
    })
  }

}
