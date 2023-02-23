import { Component, OnInit } from '@angular/core';
import {SchoolModel} from "../../../../management/models/school-list.model";
import {ActivatedRoute} from "@angular/router";
import {ClassesService} from "../../../services/classes.service";
import {ApiResponseModel} from "../../../../shared/models/api-response.model";

@Component({
  selector: 'app-teacher-classes',
  templateUrl: './teacher-classes.component.html',
  styleUrls: ['./teacher-classes.component.scss']
})
export class TeacherClassesComponent implements OnInit {

  teacher_id = this.route.snapshot.params['id'];
  displayedColumns: string[] = ['class_id', 'name', 'description', 'year', 'students'];
  dataSource!: SchoolModel[];

  constructor(private classesService: ClassesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
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
