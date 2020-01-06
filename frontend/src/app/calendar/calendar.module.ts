import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CalendarComponent } from './calendar/calendar.component';
import { DayComponent } from './day/day.component';
import { CalendarRoutingModule } from './calendar-routing.module';


@NgModule({
  declarations: [
    DayComponent,
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarRoutingModule
  ]
})
export class CalendarModule { }