import { Component, OnInit } from '@angular/core';
import {AttendanceService} from "../../../services/attendance.service";
import {ActivatedRoute} from "@angular/router";
import {GradeService} from "../../../services/grade.service";

@Component({
  selector: 'app-student-marks',
  templateUrl: './student-marks.component.html',
  styleUrls: ['./student-marks.component.scss']
})
export class StudentMarksComponent implements OnInit {

  student_id = this.route.snapshot.params['student_id'];

  displayedColumns: string[] = ['date', 'day', 'nr_amzes', 'name', 'class', 'grade'];
  dataSource!: any[];


  constructor(private gradeService: GradeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAttendanceByStudentId();
  }


  getAttendanceByStudentId() {
    this.gradeService.getGradeByStudentId(this.student_id).subscribe(res => {
      if (res?.success === 1) {
        this.dataSource = res.data;
      }
    });
  }

}
