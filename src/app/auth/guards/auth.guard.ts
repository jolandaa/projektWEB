import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {User, UserRoles} from "../../shared/models/login-user.model";
import {AccountService} from "../services/account.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const user: User = JSON.parse(<string>localStorage.getItem('user'));
    if (user?.token) {
      return true;
    }

    this.accountService.logout();
    this.router.navigateByUrl('/login');
    return false;
  }

}
