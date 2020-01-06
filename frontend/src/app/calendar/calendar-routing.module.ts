import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DayComponent } from './day/day.component';
import { CalendarComponent } from './calendar/calendar.component';

const calendarRoutes: Routes = [
  {path: ':yyyy/:mm/:dd', component: DayComponent},
  {path: '', component: CalendarComponent},
];

@NgModule({
  imports: [RouterModule.forChild(calendarRoutes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
