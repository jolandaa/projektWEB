import { Component, OnInit } from '@angular/core';
import {SchoolModel} from "../../../management/models/school-list.model";
import {User} from "../../../shared/models/login-user.model";
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
  dataSource!: any[];
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

  deleteStudent(nr_amzes: string) {
    let dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        cancelText: 'Discard',
        title: "Delete student",
        message: "Are you sure deleting this student?"
      },
      autoFocus: false,
      panelClass: 'app-modal'
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res === 'submit') {
        this.studentsService.deleteStudent(nr_amzes).subscribe(res => {
          if (res.success === 1) {
            this.getStudentList();
          } else {

          }
        })
      }
    })
  }

}
