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
}
