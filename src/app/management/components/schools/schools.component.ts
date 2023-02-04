import { Component, OnInit } from '@angular/core';
import {SchoolsService} from "../../services/schools.service";
import {SchoolModel} from "../../models/school-list.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmModalComponent} from "../../../shared/modals/confirm-modal";

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit {

  displayedColumns: string[] = ['school_id', 'name', 'description', 'street', 'city', 'country', 'zipCode', 'actions'];
  dataSource!: SchoolModel[];

  constructor(private schoolService: SchoolsService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSchoolList();
  }

  getSchoolList() {
    this.schoolService.getSchoolsList().subscribe(res => {
      if (res?.success === 1) {
        this.dataSource = res.list;
      }
    })
  }

  deleteSchool(school_id: string) {
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
        this.schoolService.deleteSchool(school_id).subscribe(res => {
          if (res.success === 1) {
            this.getSchoolList();
          } else {

          }
        })
      }
    })
  }
}
