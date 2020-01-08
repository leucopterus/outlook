import { Event } from '../event';
import { DayInfoService } from './dayInfo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
  providers: [DayInfoService],
})
export class DayComponent implements OnInit {
  eventList: Event[] = [];
  day: Date;
  dayStart: Date;

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
      console.log(this.day);
      this.dayStart = new Date(this.day.toJSON());
      this.dayStart.setHours(23, 59, 59, 999);
      // console.log(this.dayStart, this.day);
      this.http.HttpOptions.params = this.http.HttpOptions.params.set('start__lte', `${this.dayStart.toJSON()}`);
      this.http.HttpOptions.params = this.http.HttpOptions.params.set('finish__gte', `${this.day.toJSON()}`);
      // console.log(this.http.HttpOptions);
      this.http.getDaySchedule().subscribe((data: Event[]) => this.eventList = data);
    });
  }
}
