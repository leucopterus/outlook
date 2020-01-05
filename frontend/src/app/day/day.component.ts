import { Event } from '../event';
import { DayInfoService } from './dayInfo.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

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

  constructor(private http: DayInfoService, private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    const day = this.route.snapshot.paramMap.get('yyyy');
    console.log(day);
    this.dayStart = new Date(this.day.toJSON());
    this.dayStart.setHours(23, 59, 59, 999);
    this.http.HttpOptions.params = this.http.HttpOptions.params.set('start__lte', `${this.dayStart.toJSON()}`);
    this.http.HttpOptions.params = this.http.HttpOptions.params.set('finish__gte', `${this.day.toJSON()}`);
    console.log(this.http.HttpOptions);
    this.http.getDaySchedule().subscribe((data: Event[]) => this.eventList = data);
  }
}
