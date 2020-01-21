import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { DayInfoService } from './../day/dayInfo.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [DayInfoService],
})
export class CalendarComponent implements OnInit {

  public currentDate: Date;
  public selectedDate: Date;

  public sharingData: Date;

  public month: string;
  public year: number;

  public days: Date[] = [];

  constructor(private http: DayInfoService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {

      console.warn('Url from calendar: ' + this.router.url);

      this.currentDate = new Date();
      this.currentDate.setHours(0, 0, 0, 0);

      const dataListFromUrl = this.router.url.split('/');

      if (dataListFromUrl.length < 5) {
        this.router.navigate(
          [`calendar/${this.currentDate.getFullYear()}/${this.currentDate.getMonth() + 1}/${this.currentDate.getDate()}`]
        );
      }

      for (let i = dataListFromUrl.indexOf('calendar') + 1; i <= dataListFromUrl.indexOf('calendar') + 3; i++) {
        if (!Number.isInteger(+dataListFromUrl[i])) {
          this.router.navigate(
            [`calendar/${this.currentDate.getFullYear()}/${this.currentDate.getMonth() + 1}/${this.currentDate.getDate()}`]
          );
        }
      }

      this.sharingData = new Date(this.http.sharingDataValue);

      this.days.length = 0;
      this.selectDate(this.sharingData);
      this.renderMonth(this.sharingData);
    });
  }

  nextMonth() {
    this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);
    this.days.length = 0;
    this.renderMonth(this.selectedDate);
  }

  previousMonth() {
    this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);
    this.days.length = 0;
    this.renderMonth(this.selectedDate);
  }

  selectDate(day: Date): void {
    this.selectedDate = new Date(day);
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
