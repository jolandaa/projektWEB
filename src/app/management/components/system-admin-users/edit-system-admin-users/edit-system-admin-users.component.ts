import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AdminUsersService} from "../../../services/admin-users.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EditSystemAdminUsersModel, SystemAdminUsersModel} from "../../../models/system-admin-users.model";
import {AppEvents} from "../../../../app-events.service";
import {ApiResponseModel} from "../../../../shared/models/api-response.model";

@Component({
  selector: 'app-edit-system-admin-users',
  templateUrl: './edit-system-admin-users.component.html',
  styleUrls: ['./edit-system-admin-users.component.scss']
})
export class EditSystemAdminUsersComponent implements OnInit {


  user_id = this.route.snapshot.params['id'];
  userData!: SystemAdminUsersModel;
  editUserForm!: FormGroup;

  constructor(private route: ActivatedRoute,
              private userService: AdminUsersService,
              private fb: FormBuilder,
              private appEvents: AppEvents) { }

  ngOnInit(): void {
    this.getUser();
    this.editUserForm = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, Validators.required],
      role: [null, Validators.required],
    })
  }

  getUser() {
    this.userService.getUserById(this.user_id).subscribe(res => {
      this.userData = res.data;
      this.fillUserForm(this.userData);
    })
  }

  fillUserForm(data: SystemAdminUsersModel) {
    this.FirstName.setValue(data.first_name);
    this.LastName.setValue(data.last_name);
    this.Email.setValue(data.email);
    this.Role.setValue(data.role);
  }

  editUser() {
    if (this.editUserForm.invalid) {
      this.appEvents.showFailureToast("You have to complete all required fields!");
      return;
    }
    const editUserBody: EditSystemAdminUsersModel = {
      user_id: this.user_id,
      first_name: this.FirstName.value,
      last_name: this.LastName.value,
      email: this.Email.value,
    }

    this.userService.editUser(editUserBody).subscribe((res: ApiResponseModel) => {
      if (res.success) {
        this.appEvents.showSuccessToast(res.message || "You have successfully added this user.");
      }
    })
  }


  get FirstName() {
    return this.editUserForm.get('firstname') as FormControl;
  }
  get LastName() {
    return this.editUserForm.get('lastname') as FormControl;
  }
  get Email() {
    return this.editUserForm.get('email') as FormControl;
  }
  get Role() {
    return this.editUserForm.get('role') as FormControl;
  }


}
