import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly userListUrl = 'http://0.0.0.0:8000/api/users/';

  HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'applications/json',
      'Authorization': `Token ${localStorage.getItem('token')}`,
    }),
  };

  constructor(private http: HttpClient) { }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(this.userListUrl, this.HttpOptions);
  }
}
