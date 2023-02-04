import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, of, tap} from "rxjs";
import {SchoolListModel} from "../models/school-list.model";

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

  deleteSchool(school_id: string) {
    return this.http.post<any>(this.baseUrl + 'school/delete.php', {school_id}).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }
}
