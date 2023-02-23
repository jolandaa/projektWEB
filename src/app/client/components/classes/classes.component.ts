import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmModalComponent} from "../../../shared/modals/confirm-modal";
import {ClassesService} from "../../services/classes.service";
import {User} from "../../../shared/models/login-user.model";
import {ClassesModel} from "../../models/classes.model";

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  displayedColumns: string[] = ['class_id', 'name', 'description', 'year', 'teacher', 'students', 'actions'];
  dataSource!: ClassesModel[];
  loggedUser!: User;

  constructor(private classesService: ClassesService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
    this.getSchoolList();
  }

  getSchoolList() {
    this.classesService.getClassesList(this.loggedUser.school_id).subscribe(res => {
      if (res?.success === 1) {
        this.dataSource = res.list;
      }
    })
  }

  deleteClass(class_id: string) {
    let dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        cancelText: 'Discard',
        title: "Delete Class",
        message: "Are you sure deleting this class?"
      },
      autoFocus: false,
      panelClass: 'app-modal'
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res === 'submit') {
        this.classesService.deleteClass(class_id).subscribe(res => {
          if (res.success === 1) {
            this.getSchoolList();
          } else {

          }
        })
      }
    })
  }

}
