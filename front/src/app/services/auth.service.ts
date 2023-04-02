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
  private url = "http://localhost:5000/auth/register";


  httpOptions: { headers: HttpHeaders} = {
    headers: new HttpHeaders({"Content-Type": "application/json"}),
  };

  constructor(
    private http: HttpClient, 
    private errorHandlerService: ErrorHandleService
    ) { }


  signup(user: Omit<user,"id">): Observable<user>{
    return this.http
    .post<user>(this.url, user,this.httpOptions)
    .pipe(
      first(),
      catchError(this.errorHandlerService.handleError<user>("signup"))
    );

  }
}
