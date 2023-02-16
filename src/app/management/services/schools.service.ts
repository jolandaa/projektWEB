import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, of, tap} from "rxjs";
import {AddSchoolModel, EditSchoolModel, SchoolListModel} from "../models/school-list.model";

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  baseUrl = 'http://localhost/WEB/backend/';

  constructor(private http: HttpClient) { }

  getSchoolsList() {
    return this.http.get<SchoolListModel>(this.baseUrl + 'school/list.php').pipe(
      map((data: SchoolListModel) => data),
      tap((data: SchoolListModel) => data),
      catchError((error) => of(error))
    );
  }

  getSchoolById(school_id: any) {
    return this.http.get<any>(this.baseUrl + 'school/getSchoolById.php?school_id=' + school_id).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  addSchool(body: AddSchoolModel) {
    return this.http.post<any>(this.baseUrl + 'school/add.php', body).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  deleteSchool(school_id: string) {
    return this.http.post<any>(this.baseUrl + 'school/delete.php', {school_id}).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  editSchool(body: EditSchoolModel) {
    return this.http.post<any>(this.baseUrl + 'school/edit.php', body).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }
}
