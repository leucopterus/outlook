import { Event } from '../event';
import { DayInfoService } from './dayInfo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  // test: number = 0;
  // name: string = 'Ed';

  public yearFromUrl: number;
  public monthFromUrl: number;
  public dayFromUrl: number;

  constructor(private http: DayInfoService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      // console.log(params);
      this.yearFromUrl = +params.get('yyyy');
      this.monthFromUrl = +params.get('mm');
      this.dayFromUrl = +params.get('dd');
      // console.log(`${this.yearFromUrl}-${this.monthFromUrl}-${this.dayFromUrl}`);
      this.day = new Date(`${this.yearFromUrl}-${this.monthFromUrl}-${this.dayFromUrl}`);
      console.log('Day: ' + this.day);
      // this.http.getData(this.day);

      this.http.setData(this.day);
      this.dayStart = new Date(this.day.toJSON());
      this.dayStart.setHours(23, 59, 59, 999);
      // console.log(this.dayStart, this.day);

      this.http.HttpOptions.params = this.http.HttpOptions.params.set('start__lte', `${this.dayStart.toJSON()}`);
      this.http.HttpOptions.params = this.http.HttpOptions.params.set('finish__gte', `${this.day.toJSON()}`);

      console.log('data sent to the server: ' + this.http.HttpOptions.params.get('start__lte'));
      console.log('data sent to the server: ' + this.http.HttpOptions.params.get('finish__gte'));
      console.log('------------');

      this.http.getDaySchedule().subscribe((data: Event[]) => {
        this.eventList = data;
        this.eventsTitle.length = 0;

        this.createTimeGrid(this.day);
        console.log('Event List after creation: ' + Object.keys(this.eventList).length);
        
        if (Object.keys(this.eventList).length > 0) {
          this.createEventTimeGrid();
        }
      });
    });
  }

  createTimeGrid(date: Date): void {
    this.hourList.length = 0;

    const startDate = new Date(date);
    const finishDate = new Date(date);
    finishDate.setDate(date.getDate() + 1);

    // console.warn(`this date in function: ${date}`);
    // console.warn(`this finish date in function: ${finishDate}`);

    while (startDate < finishDate) {
      const transferDate = new Date(startDate);
      this.hourList.push(transferDate);
      startDate.setHours(startDate.getHours() + 1);
    }
  }

  createEventTimeGrid(): void {
    this.events = {};

    for (const event of this.eventList) {
      const title = event.title;
      const timeList: Date[] = [];

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
        eventThisDateStart.setHours(eventThisDateStart.getHours() + 1);
      }

      this.eventsTitle.push(title);
      this.events[title] = timeList;
    }
    console.log('After creating event list with time: ' + Object.keys(this.events) + ' ' + Object.values(this.events));
    console.warn(this.events);
  }

  // increaseTest($event) {
  //   this.test += 1;
  //   console.log(this.test);
  //   console.log($event);
  // }

  // decreaseTest($event) {
  //   this.test -= 1;
  //   console.log(this.test);
  //   console.log($event);
  // }

}
