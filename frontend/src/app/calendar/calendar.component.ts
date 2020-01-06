import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public currentDate: Date;
  public month: string;
  public year: number;
  public day: number;
  public days: Date[] = [];
  public selectedDate: Date;
  public sub: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      let yearFromUrl: number;
      let monthFromUrl: number;
      let dayFromUrl: number;

      if (params.has('yyyy') && params.has('mm') && params.has('dd')) {
        yearFromUrl = +params.get('yyyy');
        monthFromUrl = +params.get('mm');
        dayFromUrl = +params.get('dd');
        this.currentDate = new Date(`${yearFromUrl}-${monthFromUrl}-${dayFromUrl}`);
      } else {
        this.currentDate = new Date();
      }

      this.selectDate(this.currentDate);

      const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
      const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

      while (firstDay.getDay() !== 1) {
        firstDay.setDate(firstDay.getDate() - 1);
      }

      while (lastDay.getDay() !== 0) {
        lastDay.setDate(lastDay.getDate() + 1);
      }

      this.month = this.currentDate.toLocaleDateString('default', {month: 'long'});
      this.year = this.currentDate.getFullYear();

      for (const day: Date = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
        const dayInCalendar = new Date(day);
        this.days.push(dayInCalendar);
      }
    });
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

  selectDate(day: Date): void {
    day.setHours(0, 0, 0, 0);
    this.selectedDate = day;
    console.log(this.selectedDate);
  }

}
