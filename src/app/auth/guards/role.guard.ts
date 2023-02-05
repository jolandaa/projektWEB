import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import {User, UserRoles} from "../../shared/models/login-user.model";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> {

    const user = localStorage.getItem('user');
    if(!user) return this.router.navigateByUrl('/login');

    const userParsed: User = JSON.parse(user);

    if(userParsed.role === UserRoles.SystemAdmin) {

      return true;
    }


    return state.url.includes('client') ? true : this.router.navigateByUrl('/client');

  }


}
