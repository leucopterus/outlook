import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from 'src/app/event';

@Injectable({
  providedIn: 'root'
})
export class DayInfoService {
  readonly dayEventListUrl = 'http://0.0.0.0:8000/api/events/';

  HttpOptions = {
    params: new HttpParams({}),
    headers: new HttpHeaders({
      'Content-Type': 'applications/json',
      'Authorization': `Token ${localStorage.getItem('token')}`,
    }),
  };

  constructor(private http: HttpClient) { }

  getDaySchedule(): Observable<Event[]> {
    return this.http.get<Event[]>(this.dayEventListUrl, this.HttpOptions);
  }
}
