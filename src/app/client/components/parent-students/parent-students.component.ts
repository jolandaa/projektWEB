import { Component, OnInit } from '@angular/core';
import {SchoolModel} from "../../../management/models/school-list.model";
import {StudentsService} from "../../services/students.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-parent-students',
  templateUrl: './parent-students.component.html',
  styleUrls: ['./parent-students.component.scss']
})
export class ParentStudentsComponent implements OnInit {

  parent_id = this.route.snapshot.params['id'];
  displayedColumns: string[] = ['nr_amzes', 'first_name', 'last_name', 'email', 'date_of_join', 'gender', 'date_of_birth', 'mobile_no', 'details'];
  dataSource!: SchoolModel[];

  constructor(private studentService: StudentsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getChildren()
  }

  getChildren() {
    this.studentService.getStudentsByParentId(this.parent_id).subscribe(res => {
      if (res?.success === 1) {
        this.dataSource = res.list;
      }
    })
  }

}
