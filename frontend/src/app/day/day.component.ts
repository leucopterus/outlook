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

      this.yearFromUrl = +params.get('yyyy');
      this.monthFromUrl = +params.get('mm');
      this.dayFromUrl = +params.get('dd');

      this.day = new Date(`${this.yearFromUrl}-${this.monthFromUrl}-${this.dayFromUrl}`);

      this.http.setData(this.day);
      this.dayStart = new Date(this.day.toJSON());
      this.dayStart.setHours(23, 59, 59, 999);

      this.http.getDaySchedule(this.dayStart, this.day).subscribe((data: Event[]) => {
        this.eventList = data;
        this.eventsTitle.length = 0;

        this.createTimeGrid(this.day);

        if (Object.keys(this.eventList).length > 0) {
          this.createEventTimeGrid();
        }

        let url: string = this.router.url;

        if (url.indexOf('event') !== -1) {
          console.log('URL from day: ' + this.router.url);
          url = url.split('event/')[1];
          this.http.eventStatus = 'update';
          this.router.navigate([this.router.url]);
        }
      }, (error) => {
        this.createTimeGrid(this.day);
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
      eventThisDateFinish.setHours(eventThisDateFinish.getHours(), eventThisDateFinish.getMinutes(), 0, 0);

      while (eventThisDateStart < eventThisDateFinish) {
        const transferDate = new Date(eventThisDateStart);
        timeList.push(transferDate);

        for (keyOfTimeEventMap of this.timeAndEventMap.keys()) {
          if (keyOfTimeEventMap.toJSON() === transferDate.toJSON()) {
            break;
          }
        }

        this.timeAndEventMap.set(keyOfTimeEventMap, event);
        eventThisDateStart.setHours(eventThisDateStart.getHours() + 1);
      }

      this.eventsTitle.push(title);
      this.events[title] = timeList;
    }
  }

  selectEvent(event: Event): void {
    this.http.eventStatus = 'update';
    this.http.eventDetail = JSON.parse(JSON.stringify(event));
    this.http.sharedEventLink = this.http.baseSharedEventLink + event.id;
  }

  createEvent(): void {
    this.http.eventDetail = new Event();
    this.http.eventStatus = 'create';
  }
}
