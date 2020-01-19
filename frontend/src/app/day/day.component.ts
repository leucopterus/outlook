import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Event } from '../event';
import { DayInfoService } from './dayInfo.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
  providers: [],
})
export class DayComponent implements OnInit {
  eventList: Event[] = [];
  hourList: Date[] = [];
  day: Date;
  dayStart: Date;

  events = {};
  eventsTitle: string[] = [];
  eventsHours: Date[][] = [];

  // for list to list time and event name
  // will use hourList as list timetable
  timeAndEventMap = new Map();

  public yearFromUrl: number;
  public monthFromUrl: number;
  public dayFromUrl: number;

  constructor(
    private http: DayInfoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      // console.log(params);
      this.yearFromUrl = +params.get('yyyy');
      this.monthFromUrl = +params.get('mm');
      this.dayFromUrl = +params.get('dd');
      // console.log(`${this.yearFromUrl}-${this.monthFromUrl}-${this.dayFromUrl}`);
      this.day = new Date(`${this.yearFromUrl}-${this.monthFromUrl}-${this.dayFromUrl}`);
      // console.log('Day: ' + this.day);
      // this.http.getData(this.day);

      this.http.setData(this.day);
      this.dayStart = new Date(this.day.toJSON());
      this.dayStart.setHours(23, 59, 59, 999);
      // console.log(this.dayStart, this.day);

      this.http.HttpOptions.params = this.http.HttpOptions.params.set('start__lte', `${this.dayStart.toJSON()}`);
      this.http.HttpOptions.params = this.http.HttpOptions.params.set('finish__gte', `${this.day.toJSON()}`);

      // console.log('data sent to the server: ' + this.http.HttpOptions.params.get('start__lte'));
      // console.log('data sent to the server: ' + this.http.HttpOptions.params.get('finish__gte'));
      // console.log('------------');

      this.http.getDaySchedule().subscribe((data: Event[]) => {
        this.eventList = data;
        this.eventsTitle.length = 0;

        this.createTimeGrid(this.day);
        // console.log('Event List after creation: ' + Object.keys(this.eventList).length);

        if (Object.keys(this.eventList).length > 0) {
          this.createEventTimeGrid();
        }

        // ------------------------------------
        let url: string = this.router.url;

        if (url.indexOf('event') !== -1) {
          console.log('URL from day: ' + this.router.url);
          url = url.split('event/')[1];
          this.http.eventStatus = 'update';
          this.router.navigate([this.router.url]);
        }
      }, (error) => {
        if ( +error.status >= 400 && +error.status < 500) {
          this.toastr.warning('Hmm, something wrong with your request');
        } else {
          this.toastr.error('There is no response from the server, please, try to access to it a little bit later');
        }
      });
    });
  }

  createTimeGrid(date: Date): void {
    this.hourList.length = 0;
    this.timeAndEventMap.clear();

    const startDate = new Date(date);
    const finishDate = new Date(date);
    finishDate.setDate(date.getDate() + 1);

    // console.warn(`this date in function: ${date}`);
    // console.warn(`this finish date in function: ${finishDate}`);

    while (startDate < finishDate) {
      const transferDate = new Date(startDate);
      this.hourList.push(transferDate);
      this.timeAndEventMap.set(transferDate, null);
      startDate.setHours(startDate.getHours() + 1);
    }
  }

  createEventTimeGrid(): void {
    this.events = {};

    for (const event of this.eventList) {
      const title = event.title;
      const timeList: Date[] = [];

      let keyOfTimeEventMap: Date;

      const eventStart = new Date(event.start);
      const eventFinish = new Date(event.finish);

      const thisDateMaxTime = new Date(this.day);
      thisDateMaxTime.setHours(23, 59, 59, 999);

      const eventThisDateStart = (eventStart < this.day) ? this.day : eventStart;
      const eventThisDateFinish = (eventFinish > thisDateMaxTime) ? thisDateMaxTime : eventFinish;

      eventThisDateStart.setMinutes(0, 0, 0);
      eventThisDateFinish.setHours(eventThisDateFinish.getHours(), 0, 0, 0);

      while (eventThisDateStart < eventThisDateFinish) {
        const transferDate = new Date(eventThisDateStart);
        timeList.push(transferDate);
        // update time list
        // search for start event time
        for (keyOfTimeEventMap of this.timeAndEventMap.keys()) {
          if (keyOfTimeEventMap.toJSON() === transferDate.toJSON()) {
            break;
          }
        }
        //
        this.timeAndEventMap.set(keyOfTimeEventMap, event);
        //
        eventThisDateStart.setHours(eventThisDateStart.getHours() + 1);
      }

      this.eventsTitle.push(title);
      this.events[title] = timeList;
    }

    // console.log('After creating event list with time: ' + Object.keys(this.events) + ' ' + Object.values(this.events));
  }

  selectEvent(event: Event): void {
    this.http.eventStatus = 'update';
    this.http.eventDetail = JSON.parse(JSON.stringify(event));
    this.http.sharedEventLink = this.http.baseSharedEventLink + event.id;
    // console.log('this.http.eventStatus: ' + this.http.eventStatus);
  }

  createEvent(): void {
    this.http.eventDetail = new Event();
    this.http.eventStatus = 'create';
    // console.log('this.http.eventStatus: ' + this.http.eventStatus);
  }

}
