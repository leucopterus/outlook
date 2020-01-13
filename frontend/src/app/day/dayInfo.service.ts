import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from 'src/app/event';

@Injectable()
export class DayInfoService {
  readonly dayEventListUrl = 'http://0.0.0.0:8000/api/events/';

  // observable + behaviorsubject
  sharingDataValue: Date = new Date();
  private sharingData: BehaviorSubject<Date> = new BehaviorSubject<Date>(this.sharingDataValue);

  sharingData$: Observable<Date> = this.sharingData.asObservable();
  //

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

}
