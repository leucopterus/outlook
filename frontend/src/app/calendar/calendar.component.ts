import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  currentDate: Date = new Date();
  month: string;
  year: number;
  days: number[] = [];

  constructor() { }

  ngOnInit() {
    let firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    let lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

    while (firstDay.getDay() !== 1) {
      firstDay.setDate(firstDay.getDate() - 1);
    }

    while (lastDay.getDay() !== 0) {
      lastDay.setDate(lastDay.getDate() + 1);
    }

    this.month = this.currentDate.toLocaleDateString('default', {month: 'long'});
    this.year = this.currentDate.getFullYear();

    for (let day: Date = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
      this.days.push(day.getDate());
    }
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.days.length = 0;
    this.ngOnInit();
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.days.length = 0;
    this.ngOnInit();
  }

}
