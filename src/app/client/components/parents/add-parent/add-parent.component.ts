import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User, UserRoles} from "../../../../shared/models/login-user.model";
import {ParentsService} from "../../../services/parents.service";
import {AppEvents} from "../../../../app-events.service";
import {ApiResponseModel} from "../../../../shared/models/api-response.model";

@Component({
  selector: 'app-add-parent',
  templateUrl: './add-parent.component.html',
  styleUrls: ['./add-parent.component.scss']
})
export class AddParentComponent implements OnInit {

  addParentForm!: FormGroup;
  loggedUser!: User;
  userRole = UserRoles;

  constructor(private parentService: ParentsService,
              private fb: FormBuilder,
              private appEvents: AppEvents) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
    this.addParentForm = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, Validators.required],
    });

  }


  addParent() {
    if (this.addParentForm.invalid) {
      this.appEvents.showFailureToast("You have to complete all required fields!");
      return;
    }

    const addParent = {
      school_id: this.loggedUser.school_id,
      first_name: this.firstname.value,
      last_name: this.lastname.value,
      email: this.email.value,
      password: this.generatePassword(),
      username: this.firstname.value + '.' + this.lastname.value,
      role: this.userRole.Parent
    };

    this.parentService.addParent(addParent).subscribe((res: ApiResponseModel) => {
      if (res.success) {
        this.appEvents.showSuccessToast(res.message || "You have successfully added this parent.");
      }
    })
  }

  generatePassword() {
    return this.firstname.value + '123!';
  }

  get firstname() {
    return this.addParentForm.get('firstname') as FormControl;
  }
  get lastname() {
    return this.addParentForm.get('lastname') as FormControl;
  }
  get email() {
    return this.addParentForm.get('email') as FormControl;
  }

}
