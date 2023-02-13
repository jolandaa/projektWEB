import { Component, OnInit } from '@angular/core';
import {SchoolModel} from "../../../management/models/school-list.model";
import {User} from "../../../shared/models/login-user.model";
import {TeachersService} from "../../services/teachers.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmModalComponent} from "../../../shared/modals/confirm-modal";
import {StudentsService} from "../../services/students.service";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  displayedColumns: string[] = ['nr_amzes', 'first_name', 'last_name', 'email', 'date_of_join', 'gender', 'date_of_birth', 'mobile_no', 'parent_id','actions'];
  dataSource!: SchoolModel[];
  loggedUser!: User;

  constructor(private studentsService: StudentsService,

              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
    this.getStudentList();
  }

  getStudentList() {
    this.studentsService.getStudentList(this.loggedUser.school_id).subscribe(res => {
      if (res?.success === 1) {
        this.dataSource = res.list;
      }
    })
  }

  deleteStudent(student_id: string,user_id: string) {
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
        this.studentsService.deleteStudent(student_id, user_id).subscribe(res => {
          if (res.success === 1) {
            this.getStudentList();
          } else {

          }
        })
      }
    })
  }

}
