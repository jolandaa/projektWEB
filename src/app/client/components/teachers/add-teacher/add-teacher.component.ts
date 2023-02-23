import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User, UserRoles} from "../../../../shared/models/login-user.model";
import {TeachersService} from "../../../services/teachers.service";
import {AppEvents} from "../../../../app-events.service";
import {ApiResponseModel} from "../../../../shared/models/api-response.model";

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {

  addTeacherForm!: FormGroup;
  loggedUser!: User;
  userRole = UserRoles;

  constructor(private teacherService: TeachersService,
              private fb: FormBuilder,
              private appEvents: AppEvents) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
    this.addTeacherForm = this.fb.group({
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

  }


  addTeacher() {
    if (this.addTeacherForm.invalid) {
      this.appEvents.showFailureToast("You have to complete all required fields!");
      return;
    }
    const addClass = {
      school_id: this.loggedUser.school_id,
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
      password: this.generatePassword(),
      username: this.firstname.value + '.' + this.lastname.value,
      role: this.userRole.Teacher
    };

    this.teacherService.addTeacher(addClass).subscribe((res: ApiResponseModel) => {
      if (res.success) {
        this.appEvents.showSuccessToast(res.message || "You have successfully added this teacher.");
      }
    })
  }

  generatePassword() {
    return this.firstname.value + '123!';
  }

  get firstname() {
    return this.addTeacherForm.get('firstname') as FormControl;
  }
  get lastname() {
    return this.addTeacherForm.get('lastname') as FormControl;
  }
  get email() {
    return this.addTeacherForm.get('email') as FormControl;
  }
  get date_of_start() {
    return this.addTeacherForm.get('date_of_start') as FormControl;
  }
  get monthly_salary() {
    return this.addTeacherForm.get('monthly_salary') as FormControl;
  }
  get mobile_no() {
    return this.addTeacherForm.get('mobile_no') as FormControl;
  }
  get father_name() {
    return this.addTeacherForm.get('father_name') as FormControl;
  }
  get gender() {
    return this.addTeacherForm.get('gender') as FormControl;
  }
  get date_of_birth() {
    return this.addTeacherForm.get('date_of_birth') as FormControl;
  }
  get education() {
    return this.addTeacherForm.get('education') as FormControl;
  }
  get experience() {
    return this.addTeacherForm.get('experience') as FormControl;
  }

}
