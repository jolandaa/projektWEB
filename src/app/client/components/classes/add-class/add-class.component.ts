import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClassesService} from "../../../services/classes.service";
import {User} from "../../../../shared/models/login-user.model";
import {TeachersService} from "../../../services/teachers.service";
import {AppEvents} from "../../../../app-events.service";
import {ApiResponseModel} from "../../../../shared/models/api-response.model";

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit {

  addClassForm!: FormGroup;
  loggedUser!: User;

  teacherList: any[] = []

  constructor(private classesService: ClassesService,
              private fb: FormBuilder,
              private teacherService: TeachersService,
              private appEvents: AppEvents) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
    this.addClassForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
      teacher_id: [null, Validators.required]
    });
    this.getTeachersList();
  }

  getTeachersList() {
    this.teacherService.getTeacherList(this.loggedUser.school_id).subscribe(res => {
      if (res?.success === 1) {
        this.teacherList = res.list;
      }
    })
  }


  addClass() {
    if (this.addClassForm.invalid) {
      this.appEvents.showFailureToast("You have to complete all required fields!");
      return;
    }
    const addClass = {
      school_id: this.loggedUser.school_id,
      name: this.Name.value,
      description: this.Description.value,
      year: this.Year.value,
      teacher_id: this.Teacher_id.value,
    };

    this.classesService.addClass(addClass).subscribe((res: ApiResponseModel) => {
      if (res.success) {
        this.appEvents.showSuccessToast(res.message || "You have successfully added this class.");
      }
    })
  }

  get Name() {
    return this.addClassForm.get('name') as FormControl;
  }
  get Description() {
    return this.addClassForm.get('description') as FormControl;
  }
  get Year() {
    return this.addClassForm.get('year') as FormControl;
  }
  get Teacher_id() {
    return this.addClassForm.get('teacher_id') as FormControl;
  }
}
