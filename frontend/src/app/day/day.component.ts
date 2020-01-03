import { Event } from '../event';
import { DayInfoService } from './dayInfo.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
  providers: [DayInfoService],
})
export class DayComponent implements OnInit {
  eventList: Event[] = [];
  @Input() day: Date;
  dayStart: Date;

  constructor(private http: DayInfoService) { }

  ngOnInit() {
    this.dayStart = new Date(this.day.toJSON());
    this.dayStart.setHours(23, 59, 59, 999);
    this.http.HttpOptions.params = this.http.HttpOptions.params.set('start__lte', `${this.dayStart.toJSON()}`);
    this.http.HttpOptions.params = this.http.HttpOptions.params.set('finish__gte', `${this.day.toJSON()}`);
    console.log(this.http.HttpOptions);
    this.http.getDaySchedule().subscribe((data: Event[]) => this.eventList = data);
  }
}
