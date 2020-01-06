import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  readonly logoutUrl = 'http://0.0.0.0:8000/api/logout/';
  private HttpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('token')}`
    })
  };

  constructor(private http: HttpClient,
              private router: Router) {}

  logoutUser() {
    if (localStorage.getItem('token')) {
      this.http.post(this.logoutUrl, ' ', this.HttpOptions).subscribe((data: string) => {
        console.log(data);
        this.router.navigate(['']);
        localStorage.removeItem('token');
      });
    } else {
      this.router.navigate(['']);
    }
  }
}
