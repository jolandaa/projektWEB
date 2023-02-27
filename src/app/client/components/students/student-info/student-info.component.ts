import { Component, OnInit } from '@angular/core';
import {StudentsService} from "../../../services/students.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../../shared/models/login-user.model";

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {

  student_id = this.route.snapshot.params['id'];
  studentData!: any;
  loggedUser!: User;


  constructor(private studentService: StudentsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));

    this.getStudent();
  }

  getStudent() {
    this.studentService.getStudentById(this.student_id).subscribe(res => {
      this.studentData = res.data;
    })
  }

}
