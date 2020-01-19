import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventComponent } from './event/event.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LogoutComponent } from './logout/logout.component';
import { DayComponent } from './day/day.component';
import { EventsComponent } from './events/events.component';
import { HeaderComponent } from './header/header.component';
import { SubscriptionComponent } from './subscription/subscription.component';

@NgModule({
   declarations: [
      AppComponent,
      UsersComponent,
      RegistrationComponent,
      LoginComponent,
      UserComponent,
      CalendarComponent,
      EventComponent,
      WelcomeComponent,
      LogoutComponent,
      DayComponent,
      EventsComponent,
      HeaderComponent,
      SubscriptionComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot({
         timeOut: 5000,
         positionClass: 'toast-bottom-right',
         preventDuplicates: true,
      }),
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      HttpClientModule,
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
