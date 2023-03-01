import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../../auth/services/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginUserEntity} from "../../entities/login-user.entity";
import {User, UserRoles} from "../../models/login-user.model";
import {ApiResponseModel} from "../../models/api-response.model";
import {OldPwdValidators} from "../../utilities/old-pwd.validators";

@Component({
  selector: 'app-forgot-passw',
  templateUrl: './forgot-passw.component.html',
  styleUrls: ['./forgot-passw.component.scss']
})
export class ForgotPasswComponent implements OnInit {


  forgotPasswordForm!: FormGroup;

  email = this.route.snapshot.params['email'];
  token = this.route.snapshot.params['token'];

  constructor(private fb: FormBuilder,
              public accountService: AccountService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    localStorage.setItem('forgot-pass-data', JSON.stringify({token: this.token, email: this.email}))
    this.forgotPasswordForm = this.fb.group({
      'password': ['',Validators.required],
      'passwordConfirm': ['',Validators.required]
    }, {
      validator: OldPwdValidators.matchPwds
    });
  }

  change() {
    const forgotPasswordData: any = localStorage.getItem('forgot-pass-data')
    const parsedForgotPasswordData = JSON.parse(forgotPasswordData);
    const sendBody = {
      password: this.forgotPasswordForm.get('password')?.value,
      passwordConfirm: this.forgotPasswordForm.get('passwordConfirm')?.value,
      email: parsedForgotPasswordData.email,
    }
    this.accountService.forgetPassword(sendBody).subscribe(
      (response: LoginUserEntity) => {
        if (response.success === 1) {
          this.router.navigate(['./login']);
          localStorage.removeItem('forgot-pass-data')
        } else {

        }
      },
      error => {

      }
    );
  }

}
