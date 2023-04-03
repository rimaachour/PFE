import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { first,catchError } from 'rxjs/operators';

import { user } from '../models/user';
import { ErrorHandleService } from './error-handle.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlUser = "http://localhost:5000/auth/registerUser";
  private urlCompany = "http://localhost:5000/auth/registerCompany";


  httpOptions: { headers: HttpHeaders} = {
    headers: new HttpHeaders({"Content-Type": "application/json"}),
  };

  constructor(
    private http: HttpClient, 
    private errorHandlerService: ErrorHandleService
    ) { }


  signupUser(user: Omit<user,"id">): Observable<user>{
    return this.http
    .post<user>(this.urlUser, user,this.httpOptions)
    .pipe(
      first(),
      catchError(this.errorHandlerService.handleError<user>("signup"))
    );

  }
  signupCompany(user: Omit<user,"id">): Observable<user>{
    return this.http
    .post<user>(this.urlCompany, user,this.httpOptions)
    .pipe(
      first(),
      catchError(this.errorHandlerService.handleError<user>("signup"))
    );

  }

}
