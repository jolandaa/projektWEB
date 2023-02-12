import { Component, OnInit } from '@angular/core';
import {SchoolModel} from "../../../management/models/school-list.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmModalComponent} from "../../../shared/modals/confirm-modal";
import {ClassesService} from "../../services/classes.service";
import {User} from "../../../shared/models/login-user.model";

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  displayedColumns: string[] = ['class_id', 'name', 'description', 'year', 'actions'];
  dataSource!: SchoolModel[];
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
        cancelText: 'I18N.DISCARD'
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
