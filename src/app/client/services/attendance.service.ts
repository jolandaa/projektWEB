import { Injectable } from '@angular/core';
import {catchError, map, of, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  baseUrl = 'http://localhost/WEB/backend/';

  constructor(private http: HttpClient) { }

  addAttendance(body: any) {
    return this.http.post<any>(this.baseUrl + 'attendance/addNew.php', body).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  editAttendance(body: any) {
    return this.http.post<any>(this.baseUrl + 'attendance/edit.php', body).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  isTodayDateAdded(class_id: number, date: string) {
    return this.http.get<any>(this.baseUrl + `attendance/isDateAdded.php?class_id=${class_id}&date=${date}`).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  getAttendanceByDateAdded(class_id: number, date: string) {
    return this.http.get<any>(this.baseUrl + `attendance/getByDate.php?class_id=${class_id}&date=${date}`).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  getAttendanceByStudentId(student_id: number) {
    return this.http.get<any>(this.baseUrl + `attendance/viewByStudentId.php?student_id=${student_id}`).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }
}
