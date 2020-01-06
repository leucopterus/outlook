import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './../../user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'applications/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  readonly registerUrl = 'http://0.0.0.0:8000/api/registration/';

  constructor(private http: HttpClient) { }

  /*
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status},` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Some error had happened');
  }
*/

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, user);
  }
}
