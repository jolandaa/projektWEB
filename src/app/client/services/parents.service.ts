import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SchoolListModel} from "../../management/models/school-list.model";
import {catchError, map, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParentsService {

  baseUrl = 'http://localhost/WEB/backend/';

  constructor(private http: HttpClient) { }

  getParentList(school_id: any) {
    return this.http.get<SchoolListModel>(this.baseUrl + 'parents/list.php?school_id=' + school_id).pipe(
      map((data: SchoolListModel) => data),
      tap((data: SchoolListModel) => data),
      catchError((error) => of(error))
    );
  }

  getParentById(parent_id: any) {
    return this.http.get<any>(this.baseUrl + 'parents/getParentById.php?parent_id=' + parent_id).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }



  addParent(body: any) {
    return this.http.post<any>(this.baseUrl + 'parents/add.php', body).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  deleteParent(parent_id: string, user_id: string) {
    return this.http.post<any>(this.baseUrl + 'parents/delete.php', {parent_id,user_id}).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }

  editParent(body: any) {
    return this.http.post<any>(this.baseUrl + 'parents/edit.php', body).pipe(
      map((data: any) => data),
      tap((data: any) => data),
      catchError((error) => of(error))
    );
  }
}
