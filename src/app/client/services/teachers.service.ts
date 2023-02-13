import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SchoolListModel} from "../../management/models/school-list.model";
import {catchError, map, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  baseUrl = 'http://localhost/WEB/backend/';

  constructor(private http: HttpClient) { }

  getTeacherList(school_id: any) {
    return this.http.get<SchoolListModel>(this.baseUrl + 'teacher/list.php?school_id=' + school_id).pipe(
      map((data: SchoolListModel) => data),
      tap((data: SchoolListModel) => data),
      catchError((error) => of(error))
    );
  }

  getTeacherById(teacher_id: any) {
    return this.http.get<any>(this.baseUrl + 'teacher/getTeacherById.php?teacher_id=' + teacher_id).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  addTeacher(body: any) {
    return this.http.post<any>(this.baseUrl + 'teacher/add.php', body).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  deleteTeacher(teacher_id: string, user_id: string) {
    return this.http.post<any>(this.baseUrl + 'teacher/delete.php', {teacher_id,user_id}).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  editTeacher(body: any) {
    return this.http.post<any>(this.baseUrl + 'teacher/edit.php', body).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }
}
