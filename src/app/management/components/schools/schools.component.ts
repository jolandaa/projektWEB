import { Component, OnInit } from '@angular/core';
import {SchoolsService} from "../../services/schools.service";
import {SchoolModel} from "../../models/school-list.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmModalComponent} from "../../../shared/modals/confirm-modal";
import {AppEvents} from "../../../app-events.service";
import {ApiResponseModel} from "../../../shared/models/api-response.model";

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit {

  displayedColumns: string[] = ['school_id', 'name', 'description', 'street', 'city', 'country', 'zipCode', 'actions'];
  dataSource!: SchoolModel[];

  constructor(private schoolService: SchoolsService,
              private dialog: MatDialog,
              private appEvents: AppEvents) { }

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
        cancelText: 'Discard',
        title: "Delete school",
        message: "Are you sure deleting this school?"
      },
      autoFocus: false,
      panelClass: 'app-modal'
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res === 'submit') {
        this.schoolService.deleteSchool(school_id).subscribe((res: ApiResponseModel) => {
          if (res.success === 1) {
            this.getSchoolList();
            this.appEvents.showSuccessToast(res.message || 'You have successfully deleted this school.')
          } else {
            this.appEvents.showSuccessToast(res.message || 'Something went wrong.')
          }
        })
      }
    })
  }
}
