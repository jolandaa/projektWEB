import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  baseUrl = 'http://localhost/WEB/backend/';

  constructor(private http: HttpClient) { }

  addGrade(body: any) {
    return this.http.post<any>(this.baseUrl + 'grades/add.php', body).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  editGrade(body: any) {
    return this.http.post<any>(this.baseUrl + 'grades/edit.php', body).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  isTodayDateAdded(class_id: number, date: string) {
    console.log('sdsds')
    return this.http.get<any>(this.baseUrl + `grades/isDateAdded.php?class_id=${class_id}&date=${date}`).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  getGradeByDateAdded(class_id: number, date: string) {
    return this.http.get<any>(this.baseUrl + `grades/getByDate.php?class_id=${class_id}&date=${date}`).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }


  getGradeByTeacherId(teacher_id: any) {
    return this.http.get<any>(this.baseUrl + `grades/gradesByTeacherId.php?teacher_id=${teacher_id}`).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  getGradeByStudentId(student_id: number) {
    return this.http.get<any>(this.baseUrl + `grades/viewByStudentId.php?student_id=${student_id}`).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }
}
