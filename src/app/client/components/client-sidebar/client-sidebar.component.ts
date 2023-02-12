import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../../auth/services/account.service";
import {Router} from "@angular/router";
import {User, UserRoles} from "../../../shared/models/login-user.model";

@Component({
  selector: 'app-client-sidebar',
  templateUrl: './client-sidebar.component.html',
  styleUrls: ['./client-sidebar.component.scss']
})
export class ClientSidebarComponent implements OnInit {


  loggedUser!: User;
  userRoles = UserRoles;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(<string>localStorage.getItem('user'));
    console.log(this.loggedUser)
  }


  logOut() {
    this.accountService.logout();
    this.router.navigate(['./login']);
  }

}
