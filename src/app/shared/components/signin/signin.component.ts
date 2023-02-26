import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../../auth/services/account.service";
import {LoginUserEntity} from "../../entities/login-user.entity";
import {Router} from "@angular/router";
import {User, UserRoles} from "../../models/login-user.model";
import {ApiResponseModel} from "../../models/api-response.model";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
              public accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login() {
    this.accountService.login(this.loginForm.value).subscribe(
      (response: LoginUserEntity) => {
        if (response.success === 1) {
          const user: User = response.user;
          localStorage.setItem('user', JSON.stringify(user));
          if (user.role == UserRoles.SystemAdmin) {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/client/dashboard']);
          }
        } else {

        }
      },
      error => {

      }
    );
  }

  forgotPass() {
    if (this.loginForm.get('email')) {
      this.accountService.sendLink({email: this.loginForm.get('email')?.value}).subscribe((res: ApiResponseModel) => {
        console.log(res)
        if (res.success) {
          localStorage.setItem('forgot-pass-data', JSON.stringify(res.data));
          this.router.navigate(['/forgot-passw', res.data.token]);
        }
      })
    } else {

    }

  }

}
