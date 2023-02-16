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
import {MatSnackBar} from "@angular/material/snack-bar";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private accountService: AccountService, private snackBar: MatSnackBar) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const user: any = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    if (parsedUser) {
      request = this.addToken(request, parsedUser.token);
    }

    return next.handle(request).pipe(
      map(res => {
        console.log(res);
        return res
      }),
      catchError(error => {
        console.log(error);
        this.snackBar.open(error.error.error);

        if (error instanceof HttpErrorResponse && error.status === 401) {
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
