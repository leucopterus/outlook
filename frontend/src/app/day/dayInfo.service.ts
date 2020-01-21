import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from 'src/app/event';

@Injectable()
export class DayInfoService {
  readonly dayEventListUrl = 'http://0.0.0.0:8000/api/events/';
  readonly sharedEventUrl = 'http://0.0.0.0:8000/api/events/shared/';
  readonly baseSharedEventLink = 'http://localhost:4200/shared/events/';

  sharingDataValue: Date = new Date();

  eventDetail: Event = new Event();
  sharedEventLink: string;

  eventStatus: string = '';

  HttpOptions = {
    params: new HttpParams({}),
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`,
    }),
  };

  constructor(private http: HttpClient, private router: Router) { }

  getDaySchedule(dayStart: Date, dayFinish: Date): Observable<Event[]> {
    this.HttpOptions.params = this.HttpOptions.params.set('start__lte', `${dayStart.toJSON()}`);
    this.HttpOptions.params = this.HttpOptions.params.set('finish__gte', `${dayFinish.toJSON()}`);
    return this.http.get<Event[]>(this.dayEventListUrl, this.HttpOptions);
  }

  setData(date?: Date): void {
    if (date) {
      this.sharingDataValue = new Date(date);
    } else {
      this.sharingDataValue = new Date();
    }
  }

  updateEvent(event: Event): Observable<any> {
    this.HttpOptions.params = new HttpParams({});

    const body = {};

    for (const key of Object.keys(this.eventDetail)) {
      if (JSON.stringify(this.eventDetail[key]) !== JSON.stringify(event[key])) {
        body[key] = event[key];
      }
    }

    return this.http.patch<Event>(this.dayEventListUrl + `${event.id}/`, body, this.HttpOptions);
  }

  createEvent(event: Event): Observable<any> {
    this.HttpOptions.params = new HttpParams({});
    return this.http.post<Event>(this.dayEventListUrl, event, this.HttpOptions);
  }

  deleteEvent(event: Event): Observable<any> {
    this.HttpOptions.params = new HttpParams({});
    return this.http.delete<Event>(this.dayEventListUrl + `${event.id}/`, this.HttpOptions);
  }

  getSharedEventInfoById(eventId: string): Observable<Event> {
    this.HttpOptions.params = new HttpParams({});
    return this.http.get<Event>(this.sharedEventUrl + `${eventId}`, this.HttpOptions);
  }

  joinEvent(eventId: string, userId: string) {
    const body = {};

    this.HttpOptions.params = new HttpParams({});

    this.getSharedEventInfoById(eventId).subscribe((response: Event) => {

      body['participants'] = response.participants;

      this.http.patch<Event>(this.sharedEventUrl + `${eventId}/`, body, this.HttpOptions).subscribe((response) => {
        this.router.navigate(['calendar']);
      });
    });
  }
}
