import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { DayInfoService } from './../day/dayInfo.service';
import { Event } from 'src/app/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  fullUrl: string;
  backRefLink: string;

  event: Event = new Event();

  constructor(
    private http: DayInfoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.event = JSON.parse(JSON.stringify(this.http.eventDetail));
      this.fullUrl = JSON.stringify(this.router.url);
    });
  }

  updateEvent(): void {
    this.http.updateEvent(this.event).subscribe((response: Event) => {
      this.defineBackRefLink();
      this.router.navigate([this.backRefLink]);
    }, (error) => {
      if ( +error.status >= 400 && +error.status < 500) {
        this.toastr.warning('Please, fill out the event input fields');
      } else {
        this.toastr.error('There is no response from the server, please, try to access to it a little bit later');
      }
    });
  }

  createEvent(): void {
    this.http.createEvent(this.event).subscribe((response: Event) => {
      this.returnToDaySchedule();
    }, (error) => {
      if ( +error.status >= 400 && +error.status < 500) {
        this.toastr.warning('Please, fill out the event input fields');
      } else {
        this.toastr.error('There is no response from the server, please, try to access to it a little bit later');
      }
    });
  }

  leaveEvent(): void {
    this.http.deleteEvent(this.event).subscribe((response) => {
      this.defineBackRefLink();
      this.router.navigate([this.backRefLink]);
    }, (error) => {
      if ( +error.status >= 400 && +error.status < 500) {
        this.toastr.warning('Hmm, something wrong with your request');
      } else {
        this.toastr.error('There is no response from the server, please, try to access to it a little bit later');
      }
    });
  }

  returnToDaySchedule(): void {
    this.http.eventStatus = '';
    this.defineBackRefLink();
    this.router.navigate([this.backRefLink]);
  }

  defineBackRefLink(): void {
    if (this.fullUrl.indexOf('event') === -1) {
      this.backRefLink = JSON.parse(this.fullUrl);
    } else {
      this.backRefLink = JSON.parse(this.fullUrl).split('/event')[0];
    }
  }
}
