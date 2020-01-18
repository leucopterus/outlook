import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { DayInfoService } from './../day/dayInfo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [DayInfoService],
})
export class CalendarComponent implements OnInit, OnDestroy {

  public currentDate: Date;
  public selectedDate: Date;

  public sharingData: Date;
  public subscription: Subscription;

  public month: string;
  public year: number;

  public days: Date[] = [];

  constructor(private http: DayInfoService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {

      this.currentDate = new Date();
      this.currentDate.setHours(0, 0, 0, 0);

      if (!params.get('yyyy')) {
        this.router.navigate([`calendar/${this.currentDate.getFullYear()}/${this.currentDate.getMonth() + 1}/${this.currentDate.getDate()}`]);
      }

      this.subscription = this.http.sharingData$.subscribe((sharingData) => {
        this.sharingData = sharingData;

        // console.log('data from service: ' + this.sharingData);

        this.days.length = 0;
        this.selectDate(this.sharingData);
        this.renderMonth(this.sharingData);

        // console.warn('In subscription: ' + this.sharingData);
      });
    });
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  nextMonth() {
    this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);
    this.days.length = 0;
    this.renderMonth(this.selectedDate);
    // console.log('current date:' + this.currentDate);
  }

  previousMonth() {
    this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);
    this.days.length = 0;
    this.renderMonth(this.selectedDate);
    // console.log('current date:' + this.currentDate);
  }

  selectDate(day: Date): void {
    this.selectedDate = new Date(day);
    // console.log(this.selectedDate);
  }

  renderMonth(day: Date): void {

    const firstDay = new Date(day.getFullYear(), day.getMonth(), 1);
    const lastDay = new Date(day.getFullYear(), day.getMonth() + 1, 0);

    while (firstDay.getDay() !== 1) {
      firstDay.setDate(firstDay.getDate() - 1);
    }

    while (lastDay.getDay() !== 0) {
      lastDay.setDate(lastDay.getDate() + 1);
    }

    this.month = this.selectedDate.toLocaleDateString('default', {month: 'long'});
    this.year = this.selectedDate.getFullYear();

    for (const dayCycle: Date = firstDay; dayCycle <= lastDay; dayCycle.setDate(dayCycle.getDate() + 1)) {
      const dayInCalendar = new Date(dayCycle);
      this.days.push(dayInCalendar);
    }
  }

}
