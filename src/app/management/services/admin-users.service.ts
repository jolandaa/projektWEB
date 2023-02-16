import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SchoolListModel} from "../models/school-list.model";
import {catchError, map, Observable, of, tap} from "rxjs";
import {
  AddSystemAdminUsersModel,
  EditSystemAdminUsersModel,
  SystemAdminUsersModel, SystemAdminUsersResponseModel
} from "../models/system-admin-users.model";

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {

  baseUrl = 'http://localhost/WEB/backend/';

  constructor(private http: HttpClient) { }

  getAdminUsersList(role_id: number): Observable<SystemAdminUsersResponseModel> {
    return this.http.get<SystemAdminUsersResponseModel>(this.baseUrl + 'users/usersByRole.php?role_id=' + role_id).pipe(
      map((data: SystemAdminUsersResponseModel) => data),
      tap((data: SystemAdminUsersResponseModel) => data),
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

  addUser(body: AddSystemAdminUsersModel) {
    return this.http.post<any>(this.baseUrl + 'users/add.php', body).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  editUser(body: EditSystemAdminUsersModel) {
    return this.http.post<any>(this.baseUrl + 'users/edit.php', body).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  getUserById(user_id: string) {
    return this.http.get<any>(this.baseUrl + 'users/getUserById.php?user_id=' + user_id).pipe(
      map((data: SystemAdminUsersModel) => data),
      tap((data: SystemAdminUsersModel) => data),
      catchError((error) => of(error))
    );
  }
}
