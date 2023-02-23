import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User, UserRoles} from "../../../../shared/models/login-user.model";
import {TeachersService} from "../../../services/teachers.service";
import {ActivatedRoute} from "@angular/router";
import {AppEvents} from "../../../../app-events.service";
import {ApiResponseModel} from "../../../../shared/models/api-response.model";

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.scss']
})
export class EditTeacherComponent implements OnInit {

  editTeacherForm!: FormGroup;
  loggedUser!: User;
  userRole = UserRoles;
  teacher_id = this.route.snapshot.params['id'];
  teacherData!: any;

  constructor(private teacherService: TeachersService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private appEvents: AppEvents) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
    this.editTeacherForm = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, Validators.required],
      date_of_start: [null, Validators.required],
      monthly_salary: [null, Validators.required],
      mobile_no: [null],
      father_name: [null],
      gender: [null],
      date_of_birth: [null],
      education: [null],
      experience: [null],
    });
    this.getTeacher();
  }


  getTeacher() {
    this.teacherService.getTeacherById(this.teacher_id).subscribe(res => {
      this.teacherData = res.data;
      this.fillTeacherForm(this.teacherData);
    })
  }

  fillTeacherForm(data: any) {
    this.firstname.setValue(data.first_name);
    this.lastname.setValue(data.last_name);
    this.email.setValue(data.email);
    this.date_of_start.setValue(data.date_of_start);
    this.monthly_salary.setValue(data.monthly_salary);
    this.mobile_no.setValue(data.mobile_no);
    this.father_name.setValue(data.father_name);
    this.gender.setValue(data.gender);
    this.date_of_birth.setValue(data.date_of_birth);
    this.education.setValue(data.education);
    this.experience.setValue(data.experience);
  }

  editTeacher() {
    if (this.editTeacherForm.invalid) {
      this.appEvents.showFailureToast("You have to complete all required fields!");
      return;
    }
    const addClass = {
      school_id: this.loggedUser.school_id,
      user_id: this.teacherData.user_id,
      teacher_id: this.teacher_id,
      first_name: this.firstname.value,
      last_name: this.lastname.value,
      email: this.email.value,
      date_of_start: this.date_of_start.value,
      monthly_salary: this.monthly_salary.value,
      mobile_no: this.mobile_no.value,
      father_name: this.father_name.value,
      gender: this.gender.value,
      date_of_birth: this.date_of_birth.value,
      education: this.education.value,
      experience: this.experience.value,
      username: this.firstname.value + '.' + this.lastname.value,
    };

    this.teacherService.editTeacher(addClass).subscribe((res: ApiResponseModel) => {
      if (res.success) {
        this.appEvents.showSuccessToast(res.message || "You have successfully added this teacher.");
      }
    })
  }

  get firstname() {
    return this.editTeacherForm.get('firstname') as FormControl;
  }
  get lastname() {
    return this.editTeacherForm.get('lastname') as FormControl;
  }
  get email() {
    return this.editTeacherForm.get('email') as FormControl;
  }
  get date_of_start() {
    return this.editTeacherForm.get('date_of_start') as FormControl;
  }
  get monthly_salary() {
    return this.editTeacherForm.get('monthly_salary') as FormControl;
  }
  get mobile_no() {
    return this.editTeacherForm.get('mobile_no') as FormControl;
  }
  get father_name() {
    return this.editTeacherForm.get('father_name') as FormControl;
  }
  get gender() {
    return this.editTeacherForm.get('gender') as FormControl;
  }
  get date_of_birth() {
    return this.editTeacherForm.get('date_of_birth') as FormControl;
  }
  get education() {
    return this.editTeacherForm.get('education') as FormControl;
  }
  get experience() {
    return this.editTeacherForm.get('experience') as FormControl;
  }


}
