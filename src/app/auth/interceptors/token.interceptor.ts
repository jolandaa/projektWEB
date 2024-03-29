import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS, HttpErrorResponse
} from "@angular/common/http";
import {map, Observable, throwError} from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { AccountService } from "../services/account.service";
import {AppEvents} from "../../app-events.service";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private accountService: AccountService, private appEvents: AppEvents) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const user: any = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    if (parsedUser) {
      request = this.addToken(request, parsedUser.token);
    }

    const forgotPasswordData: any = localStorage.getItem('forgot-pass-data')
    const parsedForgotPasswordData = JSON.parse(forgotPasswordData);

    if (parsedForgotPasswordData) {
      request = this.addToken(request, parsedForgotPasswordData.token);
    }

    return next.handle(request).pipe(
      map(res => {
        return res
      }),
      catchError(error => {
        if (!error.url.includes('send_link') && !error.url.includes('attendance/edit.php') && !error.url.includes('grades/edit.php')) {
          this.appEvents.showFailureToast(error.error.error);
        }

        if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
          this.accountService.logout();
          this.router.navigateByUrl(`/login`);
        }
        return throwError(error);
      }));
  }

  private addToken(request: HttpRequest<any>, token: any) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });
  }

}


export const TOKEN_INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
};
