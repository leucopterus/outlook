import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from 'src/app/event';

@Injectable()
export class DayInfoService {
  readonly dayEventListUrl = 'http://0.0.0.0:8000/api/events/';
  readonly sharedEventUrl = 'http://0.0.0.0:8000/api/events/shared/';
  readonly baseSharedEventLink = 'http://localhost:4200/shared/events/';

  // observable + behaviorsubject
  sharingDataValue: Date = new Date();
  private sharingData: BehaviorSubject<Date> = new BehaviorSubject<Date>(this.sharingDataValue);

  sharingData$: Observable<Date> = this.sharingData.asObservable();
  //

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

  getDaySchedule(): Observable<Event[]> {
    return this.http.get<Event[]>(this.dayEventListUrl, this.HttpOptions);
  }

  // observable + behavioursubject
  setData(date?: Date): void {
    if (date) {
      this.sharingDataValue = new Date(date);
    } else {
      this.sharingDataValue = new Date();
    }
    this.sharingData.next(this.sharingDataValue);
    console.log('Set ' + this.sharingDataValue);
  }

  updateEvent(event: Event): Observable<any> {
    console.log(event);
    this.HttpOptions.params = new HttpParams({});

    const body = {};

    for (const key of Object.keys(this.eventDetail)) {
      if (JSON.stringify(this.eventDetail[key]) !== JSON.stringify(event[key])) {
        body[key] = event[key];
      }
    }

    for (const key of Object.keys(body)) {
      console.warn('Body to send: ' + key + ' => ' + body[key]);
    }

    return this.http.patch<Event>(this.dayEventListUrl + `${event.id}/`, body, this.HttpOptions);
  }

  createEvent(event: Event): Observable<any> {
    console.log(event);
    this.HttpOptions.params = new HttpParams({});

    return this.http.post<Event>(this.dayEventListUrl, event, this.HttpOptions);
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

      console.warn('sending patch request with ' + JSON.stringify(body));

      this.http.patch<Event>(this.sharedEventUrl + `${eventId}/`, body, this.HttpOptions).subscribe((response) => {
        this.router.navigate(['']);
      });
    });
  }
}
