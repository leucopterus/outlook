import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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

  constructor(private http: DayInfoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.event = JSON.parse(JSON.stringify(this.http.eventDetail));
      this.fullUrl = JSON.stringify(this.router.url);
      console.log(JSON.stringify(this.router.url));
      // console.log('Id from URL: ' + this.eventIdFromUrl);
      // console.log('event: ' + JSON.stringify(this.event));
    });
  }

  updateEvent(): void {
    this.http.updateEvent(this.event).subscribe((response) => {
      // this.router.navigate(['/calendar']);
      this.defineBackRefLink();
      this.router.navigate([this.backRefLink]);
    });
  }

  createEvent(): void {
    this.http.createEvent(this.event).subscribe((response) => {
      // this.router.navigate(['/calendar']);
      this.defineBackRefLink();
      this.router.navigate([this.backRefLink]);
    });
  }

  returnToDaySchedule(): void {
    this.defineBackRefLink();
    this.router.navigate([this.backRefLink]);
  }

  defineBackRefLink(): void {
    if (this.fullUrl.indexOf('event') === -1) {
      this.backRefLink = JSON.parse(this.fullUrl);
    } else {
      this.backRefLink = JSON.parse(this.fullUrl).split('event')[0];
    }

    console.warn(this.backRefLink);
  }
}

 /* other staff
// test: number = 0;
// name: string = 'Ed';

// increaseTest($event) {
//   this.test += 1;
//   console.log(this.test);
//   console.log($event);
// }

// decreaseTest($event) {
//   this.test -= 1;
//   console.log(this.test);
//   console.log($event);
// }
 */
