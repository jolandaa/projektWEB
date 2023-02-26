import { Component, OnInit } from '@angular/core';
import {SchoolModel} from "../../../../management/models/school-list.model";
import {ClassesService} from "../../../services/classes.service";
import {ActivatedRoute} from "@angular/router";
import {ApiResponseModel} from "../../../../shared/models/api-response.model";
import {User} from "../../../../shared/models/login-user.model";

@Component({
  selector: 'app-tch-classes',
  templateUrl: './tch-classes.component.html',
  styleUrls: ['./tch-classes.component.scss']
})
export class TchClassesComponent implements OnInit {

  teacher_id: number | undefined = 0;
  displayedColumns: string[] = ['class_id', 'name', 'description', 'year', 'students'];
  dataSource!: SchoolModel[];

  constructor(private classesService: ClassesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const user: User = JSON.parse(<string>localStorage.getItem('user'));
    this.teacher_id = user.teacher_profile?.teacher_id;
    this.getClasses()
  }

  getClasses() {
    this.classesService.getCLassByTeacherId(this.teacher_id).subscribe((res: ApiResponseModel) => {
      if (res?.success === 1) {
        this.dataSource = res.data;
      }
    })
  }

}
