import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SchoolListModel} from "../../management/models/school-list.model";
import {catchError, map, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  baseUrl = 'http://localhost/WEB/backend/';

  constructor(private http: HttpClient) { }

  getClassesList(school_id: any) {
    return this.http.get<SchoolListModel>(this.baseUrl + 'classes/list.php?school_id=' + school_id).pipe(
      map((data: SchoolListModel) => data),
      tap((data: SchoolListModel) => data),
      catchError((error) => of(error))
    );
  }

  getCLassById(class_id: any) {
    return this.http.get<any>(this.baseUrl + 'classes/getClassById.php?class_id=' + class_id).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  addClass(body: any) {
    return this.http.post<any>(this.baseUrl + 'classes/add.php', body).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  deleteClass(class_id: string) {
    return this.http.post<any>(this.baseUrl + 'classes/delete.php', {class_id}).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  editClass(body: any) {
    return this.http.post<any>(this.baseUrl + 'classes/edit.php', body).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

}
