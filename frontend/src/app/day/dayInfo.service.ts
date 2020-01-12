import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from 'src/app/event';

@Injectable({
  providedIn: 'root'
})
export class DayInfoService {
  readonly dayEventListUrl = 'http://0.0.0.0:8000/api/events/';
  // observable + behaviorsubject
  sharingDataValue: Date;
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

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  getDaySchedule(): Observable<Event[]> {
    return this.http.get<Event[]>(this.dayEventListUrl, this.HttpOptions);
  }

  // observable + behavioursubject
  setData(date: Date): void {
    this.sharingDataValue = new Date(date);
    // console.log('Set ' + this.sharingDataValue);
    this.sharingData.next(this.sharingDataValue);
  }

  getData(data?: Date): void {
    // if (data) {
    //   this.sharingDataValue = new Date(data);
    // }
    // if (!this.sharingDataValue) {
    //   this.sharingDataValue = new Date();
    // }
    console.warn('Data: ' + this.sharingDataValue);
  }

}
