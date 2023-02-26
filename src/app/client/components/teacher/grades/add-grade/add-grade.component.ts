import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../../shared/models/login-user.model";
import {ClassesService} from "../../../../services/classes.service";
import {StudentsService} from "../../../../services/students.service";
import {AttendanceService} from "../../../../services/attendance.service";
import {AppEvents} from "../../../../../app-events.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ApiResponseModel} from "../../../../../shared/models/api-response.model";
import {GradeService} from "../../../../services/grade.service";

@Component({
  selector: 'app-add-grade',
  templateUrl: './add-grade.component.html',
  styleUrls: ['./add-grade.component.scss']
})
export class AddGradeComponent implements OnInit {

  teacher_id: number | undefined = 0;


  addGradeForm!: FormGroup;
  loggedUser!: User;

  date: any;
  class_id: any;
  class_name = '';
  studentList: any[] = []
  classesList: any[] = [];

  hasChosenClass = false;
  hasChosenDate = false;

  displayedColumns: string[] = ['nr_amzes', 'picture', 'name', 'father_name', 'grade_value'];
  dataSource!: any[];

  isTodayAdded = false;

  constructor(private classesService: ClassesService,
              private fb: FormBuilder,
              private studentService: StudentsService,
              private gradeService: GradeService,
              private appEvents: AppEvents,
              private router: Router,
              private route: ActivatedRoute) {
    this.addGradeForm = this.fb.group({
      class_id: [null, Validators.required],
      date: [null, Validators.required]
    });

    this.route.queryParams.subscribe(res => {
      if (res['class_id']) {
        this.class_id = res['class_id'];
        this.hasChosenClass = true;
        this.ClassId.setValue(this.class_id);
      }

      if (res['date']) {
        this.date = res['date'];
        this.hasChosenDate = true;
        this.Date.setValue(this.date);
        this.isTodayDateAdded();
      }
      if (!res['date'] && !res['class_id']){
        this.class_id = null;
        this.hasChosenClass = false;
        this.hasChosenDate = false;
      }
    })
  }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
    this.teacher_id = this.loggedUser.teacher_profile?.teacher_id;
    this.getClasses();
  }

  submitClass() {
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

  searchStudents() {
    this.hasChosenDate = true;
    this.date = this.Date.value;
    const queryParams: Params = { date: this.date};
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
    this.gradeService.getGradeByDateAdded(this.class_id, new Date(this.Date.value).toUTCString()).subscribe(res => {
      if (res?.success === 1) {
        this.dataSource = res.data;
      }
    });
  }

  isTodayDateAdded() {
    this.gradeService.isTodayDateAdded(this.class_id, new Date(this.Date.value).toUTCString()).subscribe((res: ApiResponseModel) => {
      if (res?.success === 1) {
        this.isTodayAdded = res.data;
        if (this.isTodayAdded) {
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

    if (this.addGradeForm.invalid) {
      this.appEvents.showFailureToast("You have to complete all required fields!");
      return;
    }
    const addAttendance = {
      school_id: this.loggedUser.school_id,
      teacher_id: this.loggedUser.teacher_profile?.teacher_id,
      class_id: this.class_id,
      date: this.Date.value,
      attendanceList: this.dataSource,
    };

    this.gradeService.addGrade(addAttendance).subscribe((res: ApiResponseModel) => {
      if (res.success) {
        this.appEvents.showSuccessToast(res.message || "You have successfully added this attendance.");
        this.router.navigate(['/client/teacher/class-grades']);
      }
    })
  }


  editAttendance() {
    if (this.addGradeForm.invalid) {
      this.appEvents.showFailureToast("You have to complete all required fields!");
      return;
    }
    const addAttendance = {
      school_id: this.loggedUser.school_id,
      teacher_id: this.loggedUser.teacher_profile?.teacher_id,
      class_id: this.class_id,
      date: this.Date.value,
      attendanceList: this.dataSource,
    };

    this.gradeService.editGrade(addAttendance).subscribe((res: ApiResponseModel) => {
      if (res.success) {
        this.appEvents.showSuccessToast(res.message || "You have successfully added this attendance.");
        this.router.navigate(['/client/teacher/class-grades']);
      }
    })
  }


  get ClassId() {
    return this.addGradeForm.get('class_id') as FormControl;
  }

  get Date() {
    return this.addGradeForm.get('date') as FormControl;
  }

}
