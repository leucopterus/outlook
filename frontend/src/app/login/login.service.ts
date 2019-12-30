import { User } from './../user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
