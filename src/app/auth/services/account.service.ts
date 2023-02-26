import { Injectable} from '@angular/core';
import {catchError, map, Observable, of, tap} from "rxjs";
import {LoginUserModel} from "../../shared/models/login-user.model";
import {LoginUserEntity} from "../../shared/entities/login-user.entity";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = 'http://localhost/WEB/backend/';

  constructor(private http: HttpClient) { }

  login(credentials: LoginUserModel): Observable<LoginUserEntity> {
    return this.http.post<LoginUserEntity>(this.baseUrl + 'login.php', credentials).pipe(
      map((data: LoginUserEntity) => data),
      tap((data: LoginUserEntity) => data),
      catchError((error) => of(error))
    );
  }

  logout() {
    localStorage.clear();
  }

  changePassword(body: any) {
    return this.http.post<any>(this.baseUrl + 'changePassword.php', body).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  sendLink(body: any) {
    return this.http.post<any>(this.baseUrl + 'send_link.php', body).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  forgetPassword(body: any) {
    return this.http.post<any>(this.baseUrl + 'forgetPassword.php', body).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  schoolInformation(school_id: number) {
    return this.http.get<any>(this.baseUrl + 'school/getSchoolById.php?school_id=' + school_id).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }
}
