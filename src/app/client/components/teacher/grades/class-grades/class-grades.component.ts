import { Component, OnInit } from '@angular/core';
import {User} from "../../../../../shared/models/login-user.model";
import {ApiResponseModel} from "../../../../../shared/models/api-response.model";
import {GradeService} from "../../../../services/grade.service";
export const StatusValue = [
  'Published', 'Pending'
]
@Component({
  selector: 'app-class-grades',
  templateUrl: './class-grades.component.html',
  styleUrls: ['./class-grades.component.scss']
})
export class ClassGradesComponent implements OnInit {

  teacher_id: number | undefined = 0;
  loggedUser!: User;

  displayedColumns: string[] = ['result_date', 'nr_amzes', 'name', 'class', 'total_marks', 'status'];
  dataSource!: any[];

  statusValues = StatusValue;

  constructor(private gradeService: GradeService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
    this.teacher_id = this.loggedUser.teacher_profile?.teacher_id;
    this.getClasses()
  }


  getClasses() {
    this.gradeService.getGradeByTeacherId(this.teacher_id).subscribe((res: ApiResponseModel) => {
      if (res?.success === 1) {
        this.dataSource = res.data;
      }
    })
  }


}
