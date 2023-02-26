import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User, UserRoles} from "../../../../shared/models/login-user.model";
import {StudentsService} from "../../../services/students.service";
import {ClassesService} from "../../../services/classes.service";
import {ParentsService} from "../../../services/parents.service";
import {ActivatedRoute} from "@angular/router";
import {AppEvents} from "../../../../app-events.service";
import {ApiResponseModel} from "../../../../shared/models/api-response.model";

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {

  editStudentForm!: FormGroup;
  loggedUser!: User;
  userRole = UserRoles;

  classesList: any[] = [];
  parentsList: any[] = [];

  student_id = this.route.snapshot.params['id'];
  studentData!: any;

  constructor(private studentService: StudentsService,
              private classesService: ClassesService,
              private parentsService: ParentsService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private appEvents: AppEvents) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
    this.editStudentForm = this.fb.group({
      nr_amzes: [{value: null, disabled: true}, Validators.required],
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
    this.getStudent();
  }

  getStudent() {
    this.studentService.getStudentById(this.student_id).subscribe(res => {
      this.studentData = res.data;
      this.fillStudentForm(this.studentData);
    })
  }

  fillStudentForm(data: any) {
    this.nr_amzes.setValue(data.nr_amzes);
    this.firstname.setValue(data.first_name);
    this.lastname.setValue(data.last_name);
    this.email.setValue(data.email);
    this.date_of_join.setValue(data.date_of_join);
    this.class_id.setValue(data.class_id);
    this.mobile_no.setValue(data.mobile_no);
    this.father_name.setValue(data.father_name);
    this.gender.setValue(data.gender);
    this.date_of_birth.setValue(data.date_of_birth);
    this.parent_id.setValue(data.parent_id);
    this.picture.setValue(data.picture);
    this.date_of_birth.setValue(data.date_of_birth);
    this.father_mobile_no.setValue(data.father_mobile_no);
    this.father_education.setValue(data.father_education);
    this.father_profession.setValue(data.father_profession);
    this.mother_first_name.setValue(data.mother_first_name);
    this.mother_education.setValue(data.mother_education);
    this.mother_profession.setValue(data.mother_profession);
    this.mother_mobile_no.setValue(data.mother_mobile_no);
  }


  getClassesList() {
    this.classesService.getClassesList(this.loggedUser.school_id || this.loggedUser.teacher_profile?.school_id || this.loggedUser.parent_profile?.school_id).subscribe(res => {
      if (res?.success) {
        this.classesList = res.list;
      }
    });
  }

  getParentsList() {
    this.parentsService.getParentList(this.loggedUser.school_id || this.loggedUser.teacher_profile?.school_id || this.loggedUser.parent_profile?.school_id).subscribe(res => {
      if (res?.success) {
        this.parentsList = res.list;
      }
    });
  }


  editStudent() {
    if (this.editStudentForm.invalid) {
      this.appEvents.showFailureToast("You have to complete all required fields!");
      return;
    }
    const editStudent = {
      school_id: this.loggedUser.school_id || this.loggedUser.teacher_profile?.school_id || this.loggedUser.parent_profile?.school_id,
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

    this.studentService.editStudent(editStudent).subscribe((res: ApiResponseModel) => {
      if (res.success) {
        this.appEvents.showSuccessToast(res.message || "You have successfully edited this student.");
      }
    })
  }


  get nr_amzes() {
    return this.editStudentForm.get('nr_amzes') as FormControl;
  }
  get firstname() {
    return this.editStudentForm.get('firstname') as FormControl;
  }
  get lastname() {
    return this.editStudentForm.get('lastname') as FormControl;
  }
  get email() {
    return this.editStudentForm.get('email') as FormControl;
  }
  get date_of_join() {
    return this.editStudentForm.get('date_of_join') as FormControl;
  }
  get class_id() {
    return this.editStudentForm.get('class_id') as FormControl;
  }
  get gender() {
    return this.editStudentForm.get('gender') as FormControl;
  }
  get mobile_no() {
    return this.editStudentForm.get('mobile_no') as FormControl;
  }
  get parent_id() {
    return this.editStudentForm.get('parent_id') as FormControl;
  }
  get picture() {
    return this.editStudentForm.get('picture') as FormControl;
  }
  get father_name() {
    return this.editStudentForm.get('father_name') as FormControl;
  }
  get date_of_birth() {
    return this.editStudentForm.get('date_of_birth') as FormControl;
  }
  get father_mobile_no() {
    return this.editStudentForm.get('father_mobile_no') as FormControl;
  }
  get father_education() {
    return this.editStudentForm.get('father_education') as FormControl;
  }
  get father_profession() {
    return this.editStudentForm.get('father_profession') as FormControl;
  }
  get mother_first_name() {
    return this.editStudentForm.get('mother_first_name') as FormControl;
  }
  get mother_education() {
    return this.editStudentForm.get('mother_education') as FormControl;
  }
  get mother_profession() {
    return this.editStudentForm.get('mother_profession') as FormControl;
  }
  get mother_mobile_no() {
    return this.editStudentForm.get('mother_mobile_no') as FormControl;
  }

}
