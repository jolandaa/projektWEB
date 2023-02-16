import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminUsersService} from "../../../services/admin-users.service";
import {AddSystemAdminUsersModel} from "../../../models/system-admin-users.model";

@Component({
  selector: 'app-add-system-admin-users',
  templateUrl: './add-system-admin-users.component.html',
  styleUrls: ['./add-system-admin-users.component.scss']
})
export class AddSystemAdminUsersComponent implements OnInit {


  addUserForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: AdminUsersService) {
  }

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, Validators.required],
      role: [2, Validators.required],
    })
  }


  addUser() {
    const addUserBody: AddSystemAdminUsersModel = {
      first_name: this.FirstName.value,
      last_name: this.LastName.value,
      email: this.Email.value,
      role: this.Role.value,
      password: this.generatePassword(),
      username: this.FirstName.value + '.' + this.LastName.value
    }

    this.userService.addUser(addUserBody).subscribe(res => {
      console.log(res);
    })
  }

  generatePassword() {
    return this.FirstName.value + '123!';
  }


  get FirstName() {
    return this.addUserForm.get('firstname') as FormControl;
  }
  get LastName() {
    return this.addUserForm.get('lastname') as FormControl;
  }
  get Email() {
    return this.addUserForm.get('email') as FormControl;
  }
  get Role() {
    return this.addUserForm.get('role') as FormControl;
  }
}
