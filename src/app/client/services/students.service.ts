import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SchoolListModel} from "../../management/models/school-list.model";
import {catchError, map, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  baseUrl = 'http://localhost/WEB/backend/';

  constructor(private http: HttpClient) { }

  getStudentList(school_id: any) {
    return this.http.get<SchoolListModel>(this.baseUrl + 'students/list.php?school_id=' + school_id).pipe(
      map((data: SchoolListModel) => data),
      tap((data: SchoolListModel) => data),
      catchError((error) => of(error))
    );
  }

  getStudentById(nr_amzes: any) {
    return this.http.get<any>(this.baseUrl + 'students/getStudentById.php?nr_amzes=' + nr_amzes).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  addStudent(body: any) {
    return this.http.post<any>(this.baseUrl + 'students/add.php', body).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  deleteStudent(nr_amzes: string) {
    return this.http.post<any>(this.baseUrl + 'students/delete.php', {nr_amzes}).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  editStudent(body: any) {
    return this.http.post<any>(this.baseUrl + 'students/edit.php', body).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  getStudentsByParentId(parent_id: any) {
    return this.http.get<any>(this.baseUrl + 'students/getStudentsByParentId.php?parent_id=' + parent_id).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  getStudentsByClassId(class_id: any) {
    return this.http.get<any>(this.baseUrl + 'students/getStudentByClassId.php?class_id=' + class_id).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  generateReport(nr_amzes: string){
    const httpOptions = {
      responseType: 'blob' as 'json'
  };
    return this.http.get<any>(this.baseUrl + 'students/generateReport.php?nr_amzes=' + nr_amzes, httpOptions).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }
}
