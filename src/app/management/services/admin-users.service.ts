import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SchoolListModel} from "../models/school-list.model";
import {catchError, map, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {

  baseUrl = 'http://localhost/WEB/backend/';

  constructor(private http: HttpClient) { }

  getAdminUsersList(role_id: any) {
    return this.http.get<SchoolListModel>(this.baseUrl + 'users/usersByRole.php?role_id=' + role_id).pipe(
      map((data: SchoolListModel) => data),
      tap((data: SchoolListModel) => data),
      catchError((error) => of(error))
    );
  }

  deleteUser(user_id: string) {
    return this.http.post<any>(this.baseUrl + 'users/delete.php', {user_id}).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  addUser(body: any) {
    return this.http.post<any>(this.baseUrl + 'users/add.php', body).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  editUser(body: any) {
    return this.http.post<any>(this.baseUrl + 'users/edit.php', body).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  getUserById(user_id: any) {
    return this.http.get<any>(this.baseUrl + 'users/getUserById.php?user_id=' + user_id).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }
}
