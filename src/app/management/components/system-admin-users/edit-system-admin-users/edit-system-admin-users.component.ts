import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SchoolsService} from "../../../services/schools.service";
import {AdminUsersService} from "../../../services/admin-users.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-system-admin-users',
  templateUrl: './edit-system-admin-users.component.html',
  styleUrls: ['./edit-system-admin-users.component.scss']
})
export class EditSystemAdminUsersComponent implements OnInit {


  user_id = this.route.snapshot.params['id'];
  userData!: any;
  editUserForm!: FormGroup;

  constructor(private route: ActivatedRoute,
              private userService: AdminUsersService,
              private fb: FormBuilder) { }

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

  fillUserForm(data: any) {
    this.FirstName.setValue(data.first_name);
    this.LastName.setValue(data.last_name);
    this.Email.setValue(data.email);
    this.Role.setValue(data.role);
  }

  editUser() {
    const editUserBody = {
      user_id: this.user_id,
      first_name: this.FirstName.value,
      last_name: this.LastName.value,
      email: this.Email.value,
    }

    this.userService.editUser(editUserBody).subscribe(res => {
      console.log(res);
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
