import { User } from './../user';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly loginUrl = 'http://0.0.0.0:8000/api/login/';

  constructor(private http: HttpClient) { }

  loginUser(user: User): Observable<User> {
    return this.http.post<User>(this.loginUrl, user);
  }
}
