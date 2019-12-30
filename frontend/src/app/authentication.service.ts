import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private registrationUrl = 'registration';
  private loginUrl = 'login';
  private logoutUrl = 'logout';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  validateInputUserValues(user: User): boolean {
    return true;
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.registrationUrl, user, this.httpOptions);
  }

  handleIncorrectRegistrationValues(user: User): void {

  }

}
