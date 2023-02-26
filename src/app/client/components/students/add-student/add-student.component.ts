import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User, UserRoles} from "../../../../shared/models/login-user.model";
import {StudentsService} from "../../../services/students.service";
import {ClassesService} from "../../../services/classes.service";
import {ParentsService} from "../../../services/parents.service";
import {AppEvents} from "../../../../app-events.service";
import {ApiResponseModel} from "../../../../shared/models/api-response.model";

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  addStudentForm!: FormGroup;
  loggedUser!: User;
  userRole = UserRoles;

  classesList: any[] = [];
  parentsList: any[] = [];

  constructor(private studentService: StudentsService,
              private classesService: ClassesService,
              private parentsService: ParentsService,
              private fb: FormBuilder,
              private appEvents: AppEvents) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
    this.addStudentForm = this.fb.group({
      nr_amzes: [null, Validators.required],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, Validators.required],
      date_of_join: [null, Validators.required],
      class_id: [null, Validators.required],
      gender: [null, Validators.required],
      mobile_no: [null],
      parent_id: [null],
      picture: [null],
      father_name: [null],
      date_of_birth: [null],
      father_mobile_no: [null],
      father_education: [null],
      father_profession: [null],
      mother_first_name: [null],
      mother_education: [null],
      mother_profession: [null],
      mother_mobile_no: [null],
    });
    this.getClassesList();
    this.getParentsList();
  }


  getClassesList() {
    this.classesService.getClassesList(this.loggedUser.school_id).subscribe(res => {
      if (res?.success) {
        this.classesList = res.list;
      }
    });
  }

  getParentsList() {
    this.parentsService.getParentList(this.loggedUser.school_id).subscribe(res => {
      if (res?.success) {
        this.parentsList = res.list;
      }
    });
  }


  addStudent() {
    if (this.addStudentForm.invalid) {
      this.appEvents.showFailureToast("You have to complete all required fields!");
      return;
    }
    const addStudent = {
      school_id: this.loggedUser.school_id,
      nr_amzes: this.nr_amzes.value,
      first_name: this.firstname.value,
      last_name: this.lastname.value,
      email: this.email.value,
      date_of_join: this.date_of_join.value,
      class_id: this.class_id.value,
      gender: this.gender.value,
      mobile_no: this.mobile_no.value,
      parent_id: this.parent_id.value,
      picture: this.picture.value,
      father_name: this.father_name.value,
      date_of_birth: this.date_of_birth.value,
      father_mobile_no: this.father_mobile_no.value,
      father_education: this.father_education.value,
      father_profession: this.father_profession.value,
      mother_first_name: this.mother_first_name.value,
      mother_education: this.mother_education.value,
      mother_profession: this.mother_profession.value,
      mother_mobile_no: this.mother_mobile_no.value,
    };

    this.studentService.addStudent(addStudent).subscribe((res: ApiResponseModel) => {
      if (res.success) {
        this.appEvents.showSuccessToast(res.message || "You have successfully added this student.");
      }
    })
  }


  get nr_amzes() {
    return this.addStudentForm.get('nr_amzes') as FormControl;
  }
  get firstname() {
    return this.addStudentForm.get('firstname') as FormControl;
  }
  get lastname() {
    return this.addStudentForm.get('lastname') as FormControl;
  }
  get email() {
    return this.addStudentForm.get('email') as FormControl;
  }
  get date_of_join() {
    return this.addStudentForm.get('date_of_join') as FormControl;
  }
  get class_id() {
    return this.addStudentForm.get('class_id') as FormControl;
  }
  get gender() {
    return this.addStudentForm.get('gender') as FormControl;
  }
  get mobile_no() {
    return this.addStudentForm.get('mobile_no') as FormControl;
  }
  get parent_id() {
    return this.addStudentForm.get('parent_id') as FormControl;
  }
  get picture() {
    return this.addStudentForm.get('picture') as FormControl;
  }
  get father_name() {
    return this.addStudentForm.get('father_name') as FormControl;
  }
  get date_of_birth() {
    return this.addStudentForm.get('date_of_birth') as FormControl;
  }
  get father_mobile_no() {
    return this.addStudentForm.get('father_mobile_no') as FormControl;
  }
  get father_education() {
    return this.addStudentForm.get('father_education') as FormControl;
  }
  get father_profession() {
    return this.addStudentForm.get('father_profession') as FormControl;
  }
  get mother_first_name() {
    return this.addStudentForm.get('mother_first_name') as FormControl;
  }
  get mother_education() {
    return this.addStudentForm.get('mother_education') as FormControl;
  }
  get mother_profession() {
    return this.addStudentForm.get('mother_profession') as FormControl;
  }
  get mother_mobile_no() {
    return this.addStudentForm.get('mother_mobile_no') as FormControl;
  }
}
