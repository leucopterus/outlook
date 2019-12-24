import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DayComponent } from './day/day.component';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'users', component: UsersComponent},
  {path: 'users/:id', component: UserComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'calendar/day/:id', component: DayComponent},
  {path: 'events/', component: EventsComponent},
  {path: 'events/:id', component: EventComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
