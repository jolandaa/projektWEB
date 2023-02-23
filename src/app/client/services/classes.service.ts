import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, tap} from "rxjs";
import {ClassesResponseModel} from "../models/classes.model";

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  baseUrl = 'http://localhost/WEB/backend/';

  constructor(private http: HttpClient) { }

  getClassesList(school_id: any): Observable<ClassesResponseModel> {
    return this.http.get<ClassesResponseModel>(this.baseUrl + 'classes/list.php?school_id=' + school_id).pipe(
      map((data: ClassesResponseModel) => data),
      tap((data: ClassesResponseModel) => data),
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

  getCLassByTeacherId(teacher_id: any) {
    return this.http.get<any>(this.baseUrl + 'classes/getClassByTeacherId.php?teacher_id=' + teacher_id).pipe(
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
