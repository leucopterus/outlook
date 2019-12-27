import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './../user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  readonly registerUrl = 'http://0.0.0.0:8000/api/registration';

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, user);
  }
}
