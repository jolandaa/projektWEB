import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../../auth/services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-sidebar',
  templateUrl: './client-sidebar.component.html',
  styleUrls: ['./client-sidebar.component.scss']
})
export class ClientSidebarComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }


  logOut() {
    this.accountService.logout();
    this.router.navigate(['./login']);
  }

}
