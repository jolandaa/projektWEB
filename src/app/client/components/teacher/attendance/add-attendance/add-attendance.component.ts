import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../../shared/models/login-user.model";
import {ClassesService} from "../../../../services/classes.service";
import {AppEvents} from "../../../../../app-events.service";
import {ApiResponseModel} from "../../../../../shared/models/api-response.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {StudentsService} from "../../../../services/students.service";
import {AttendanceService} from "../../../../services/attendance.service";


@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.scss']
})
export class AddAttendanceComponent implements OnInit {

  teacher_id: number | undefined = 0;


  addAttendanceForm!: FormGroup;
  loggedUser!: User;

  class_id: any;
  class_name = '';
  studentList: any[] = []
  classesList: any[] = [];

  hasChosenClass = false;

  displayedColumns: string[] = ['nr_amzes', 'picture', 'name', 'father_name', 'attendance_value'];
  dataSource!: any[];

  isTodayAdded = false;

  constructor(private classesService: ClassesService,
              private fb: FormBuilder,
              private studentService: StudentsService,
              private attendanceService: AttendanceService,
              private appEvents: AppEvents,
              private router: Router,
              private route: ActivatedRoute) {
    this.addAttendanceForm = this.fb.group({
      class_id: [null, Validators.required],
    });

    this.route.queryParams.subscribe(res => {
      if (res['class_id']) {
        this.class_id = res['class_id'];
        this.hasChosenClass = true;
        this.ClassId.setValue(this.class_id);
        this.isTodayDateAdded();
      } else {
        this.class_id = null;
        this.hasChosenClass = false;
      }
    })
  }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
    this.teacher_id = this.loggedUser.teacher_profile?.teacher_id;
    this.getClasses();
  }


  searchStudents() {
    this.hasChosenClass = true;
    this.class_id = this.ClassId.value;
    const queryParams: Params = { class_id: this.class_id,class_name: this.class_name };
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }


  getClasses() {
    this.classesService.getCLassByTeacherId(this.teacher_id).subscribe((res: ApiResponseModel) => {
      if (res?.success === 1) {
        this.classesList = res.data;
      }
    })
  }


  getStudentList() {
    this.studentService.getStudentsByClassId(this.class_id).subscribe(res => {
      if (res?.success === 1) {
        this.dataSource = res.list;
        this.dataSource.map(res => res.attendance_value = 1);
      }
    });
  }

  getAttendanceByDate() {
    this.attendanceService.getAttendanceByDateAdded(this.class_id, new Date().toUTCString()).subscribe(res => {
      if (res?.success === 1) {
        this.dataSource = res.data;
      }
    });
  }

  isTodayDateAdded() {
    this.attendanceService.isTodayDateAdded(this.class_id, new Date().toUTCString()).subscribe((res: ApiResponseModel) => {
      if (res?.success === 1) {
        this.isTodayAdded = res.data;
        if (this.isTodayAdded) {
          this.displayedColumns= ['nr_amzes', 'picture', 'name', 'father_name', 'attendance_value', 'status'];
          this.getAttendanceByDate();
        } else {
          this.getStudentList();
        }
      }
    })
  }


  publishAll() {
    this.dataSource.map(res => res.status = 1);
      this.editAttendance()
  }


  addAttendance() {
    if (this.addAttendanceForm.invalid) {
      this.appEvents.showFailureToast("You have to complete all required fields!");
      return;
    }
    const addAttendance = {
      school_id: this.loggedUser.school_id,
      teacher_id: this.loggedUser.teacher_profile?.teacher_id,
      class_id: this.class_id,
      date: new Date(),
      attendanceList: this.dataSource,
    };

    this.attendanceService.addAttendance(addAttendance).subscribe((res: ApiResponseModel) => {
      if (res.success) {
        this.appEvents.showSuccessToast(res.message || "You have successfully added this attendance.");
        this.isTodayDateAdded();
      }
    })
  }

  editAttendance() {
    if (this.addAttendanceForm.invalid) {
      this.appEvents.showFailureToast("You have to complete all required fields!");
      return;
    }
    const addAttendance = {
      school_id: this.loggedUser.school_id,
      teacher_id: this.loggedUser.teacher_profile?.teacher_id,
      class_id: this.class_id,
      date: new Date(),
      attendanceList: this.dataSource,
    };

    this.attendanceService.editAttendance(addAttendance).subscribe((res: ApiResponseModel) => {
      this.appEvents.showSuccessToast(res.message || "You have successfully added this attendance.");
      this.isTodayDateAdded();
    })
  }

  get ClassId() {
    return this.addAttendanceForm.get('class_id') as FormControl;
  }

  get date() {
    return this.addAttendanceForm.get('date') as FormControl;
  }
  get student_id() {
    return this.addAttendanceForm.get('student_id') as FormControl;
  }

}
