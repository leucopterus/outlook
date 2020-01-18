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
import { SubscriptionComponent } from './subscription/subscription.component';

const routes: Routes = [
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'users', children: [
    {path: 'user', component: UserComponent},
    {path: '', component: UsersComponent},
  ]},
  {path: 'calendar', component: CalendarComponent, children: [
    {path: ':yyyy/:mm/:dd', component: DayComponent, children: [
      {path: 'event/:id', component: EventComponent},
    ]},
  ]},
  {path: 'event', component: EventsComponent, children: [
    {path: ':id', component: EventComponent},
  ]},
  {path: 'shared/events/:id', component: SubscriptionComponent},
  {path: '', component: WelcomeComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
