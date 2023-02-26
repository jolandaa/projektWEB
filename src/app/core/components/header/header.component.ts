import { Component, OnInit } from '@angular/core';
import {User, UserRoles} from "../../../shared/models/login-user.model";
import {AccountService} from "../../../auth/services/account.service";
import {SchoolModel} from "../../../management/models/school-list.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedUser!: User;
  userRoles = UserRoles;
  school_id!: any;
  schoolData!: SchoolModel;

  constructor(private accService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
    this.school_id = this.loggedUser.school_id || this.loggedUser.teacher_profile?.school_id || this.loggedUser.parent_profile?.school_id;
    if (this.school_id) {
      this.getSchool();
    }
  }

  getSchool() {
    this.accService.schoolInformation(this.school_id).subscribe(res => {
      this.schoolData = res.data;
    })
  }

  logOut() {
    this.accService.logout();
    this.router.navigate(['./login']);
  }

}
