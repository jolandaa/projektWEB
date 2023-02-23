import { Component, OnInit } from '@angular/core';
import {SchoolModel} from "../../../management/models/school-list.model";
import {User} from "../../../shared/models/login-user.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmModalComponent} from "../../../shared/modals/confirm-modal";
import {TeachersService} from "../../services/teachers.service";
import {ApiResponseModel} from "../../../shared/models/api-response.model";
import {AppEvents} from "../../../app-events.service";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  displayedColumns: string[] = ['teacher_id', 'first_name', 'last_name', 'email', 'date_of_start', 'gender', 'date_of_birth', 'education', 'experience', 'classes','actions'];
  dataSource!: SchoolModel[];
  loggedUser!: User;

  constructor(private teacherService: TeachersService,
              private dialog: MatDialog,
              private appEvents: AppEvents) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
    this.getTeacherList();
  }

  getTeacherList() {
    this.teacherService.getTeacherList(this.loggedUser.school_id).subscribe(res => {
      if (res?.success === 1) {
        this.dataSource = res.list;
      }
    })
  }

  deleteTeacher(teacher_id: string,user_id: string) {
    let dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        cancelText: 'Discard',
        title: "Delete Teacher",
        message: "Are you sure deleting this teacher?"
      },
      autoFocus: false,
      panelClass: 'app-modal'
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res === 'submit') {
        this.teacherService.deleteTeacher(teacher_id, user_id).subscribe((res: ApiResponseModel) => {
          if (res.success === 1) {
            this.getTeacherList();
            this.appEvents.showSuccessToast(res.message || 'You have successfully deleted this user.')
          }
        })
      }
    })
  }

}
