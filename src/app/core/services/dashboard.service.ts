import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, of, tap} from "rxjs";

export interface SystemAdminDashboard {
  totalSchools?: number;
  totalSchoolsThisMonth?: number;
  totalAdminUsers?: number;
  totalAdminUsersThisMonth?: number
}

export interface AdminDashboard {
  "totalTeachers"?: number;
  "totalTeachersThisMonth"?: number;
  "totalClasses"?: number;
  "totalClassesThisMonth"?: number;
  "totalStudents"?: number;
  "totalStudentsThisMonth"?: number;
  "totalParents"?: number;
  "totalParentsThisMonth"?: number;
}
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl = 'http://localhost/WEB/backend/';

  constructor(private http: HttpClient) { }

  getSystemAdminDashboard() {
    return this.http.get<any>(this.baseUrl + `dashboard/systemAdminDashboard.php`).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  getAdminDashboard(school_id: number | undefined) {
    return this.http.get<any>(this.baseUrl + `dashboard/adminDashboard.php?school_id=${school_id}`).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  getParentDashboard(parent_id: number | undefined) {
    return this.http.get<any>(this.baseUrl + `dashboard/parentDashboard.php?parent_id=${parent_id}`).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }
}
