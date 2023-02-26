import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SchoolModel} from "../../../../management/models/school-list.model";
import {StudentsService} from "../../../services/students.service";

@Component({
  selector: 'app-view-children',
  templateUrl: './view-children.component.html',
  styleUrls: ['./view-children.component.scss']
})
export class ViewChildrenComponent implements OnInit {

  parent_id = this.route.snapshot.params['id'];
  displayedColumns: string[] = ['nr_amzes', 'first_name', 'last_name', 'email', 'date_of_join', 'gender', 'date_of_birth', 'mobile_no'];
  dataSource!: any[];

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
