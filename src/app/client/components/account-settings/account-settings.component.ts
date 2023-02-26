import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../shared/models/login-user.model";
import {AccountService} from "../../../auth/services/account.service";
import {OldPwdValidators} from "../../../shared/utilities/old-pwd.validators";

export const Roles = [
  'System Admin', 'School Admin', 'Teacher', 'Parent'
]

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements  OnInit {

  form1: FormGroup;

  email: any

  loggedUser: User | any;
  userRoles = Roles;

  constructor(fb: FormBuilder,
              private accountService: AccountService){
    this.form1 = fb.group({
      'oldPwd': ['',Validators.required],
      'newPwd': ['',Validators.required],
      'confirmPwd': ['',Validators.required]
    }, {
      validator: OldPwdValidators.matchPwds
    });
  }

  ngOnInit() {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
    this.email = this.loggedUser.email;
  }

  submit() {
    const sendBody = {
      currentPassword: this.oldPwd?.value,
      password: this.newPwd?.value,
      passwordConfirm: this.confirmPwd?.value,
      email: this.email
    }

    console.log(sendBody);
    this.accountService.changePassword(sendBody).subscribe(res => {
      console.log(res);
    })
  }

  get oldPwd(){
    return this.form1.get('oldPwd');
  }

  get newPwd(){
    return this.form1.get('newPwd');
  }

  get confirmPwd(){
    return this.form1.get('confirmPwd');
  }

}
