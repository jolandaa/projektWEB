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

    if(state.url.includes('admin') && userParsed.role === UserRoles.SystemAdmin) {
      return true;
    } else if(state.url.includes('admin') && userParsed.role != UserRoles.SystemAdmin) {
      return this.router.navigateByUrl('/client/dashboard');
    } else if(state.url.includes('client') && userParsed.role == UserRoles.SystemAdmin) {
      return this.router.navigateByUrl('/admin/dashboard');
    } else {
      return true;
    }




  }


}
