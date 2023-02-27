import { Component, OnInit } from '@angular/core';
import {SchoolModel} from "../../../../management/models/school-list.model";
import {StudentsService} from "../../../services/students.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../../shared/models/login-user.model";

@Component({
  selector: 'app-class-students',
  templateUrl: './class-students.component.html',
  styleUrls: ['./class-students.component.scss']
})
export class ClassStudentsComponent implements OnInit {

  class_id = this.route.snapshot.params['id'];
  displayedColumns: string[] = ['nr_amzes', 'first_name', 'last_name', 'email', 'date_of_join', 'gender', 'date_of_birth', 'mobile_no'];
  dataSource!: SchoolModel[];
  loggedUser!: User;

  constructor(private studentService: StudentsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));

    this.getChildren()
  }

  getChildren() {
    this.studentService.getStudentsByClassId(this.class_id).subscribe(res => {
      if (res?.success === 1) {
        this.dataSource = res.list;
      }
    })
  }

}
