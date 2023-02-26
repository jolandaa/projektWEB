import { Component, OnInit } from '@angular/core';
import {AttendanceService} from "../../../services/attendance.service";
import {ActivatedRoute} from "@angular/router";

export const AttendanceValue = [
  'Present', 'Absent'
]
@Component({
  selector: 'app-student-attendances',
  templateUrl: './student-attendances.component.html',
  styleUrls: ['./student-attendances.component.scss']
})
export class StudentAttendancesComponent implements OnInit {

  student_id = this.route.snapshot.params['student_id'];

  displayedColumns: string[] = ['date', 'day', 'nr_amzes', 'name', 'class', 'status'];
  dataSource!: any[];

  AttendanceValues = AttendanceValue;

  constructor(private attendanceService: AttendanceService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAttendanceByStudentId();
  }


  getAttendanceByStudentId() {
    this.attendanceService.getAttendanceByStudentId(this.student_id).subscribe(res => {
      if (res?.success === 1) {
        this.dataSource = res.data;
      }
    });
  }
}
