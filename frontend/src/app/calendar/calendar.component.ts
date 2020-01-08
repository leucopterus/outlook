import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public currentDate: Date;
  public selectedDate: Date;

  public month: string;
  public year: number;
  public day: number;
  public days: Date[] = [];

  constructor() {}

  ngOnInit() {
    this.currentDate = new Date();
    this.selectDate(this.currentDate);

    this.renderMonth(this.currentDate);
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.days.length = 0;
    this.renderMonth(this.currentDate);
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.days.length = 0;
    this.renderMonth(this.currentDate);
  }

  selectDate(day: Date): void {
    day.setHours(0, 0, 0, 0);
    this.selectedDate = day;
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

    this.month = this.currentDate.toLocaleDateString('default', {month: 'long'});
    this.year = this.currentDate.getFullYear();

    for (const dayCycle: Date = firstDay; dayCycle <= lastDay; dayCycle.setDate(dayCycle.getDate() + 1)) {
      const dayInCalendar = new Date(dayCycle);
      this.days.push(dayInCalendar);
    }
  }

}
