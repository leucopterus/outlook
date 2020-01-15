import { Router } from '@angular/router';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { DayInfoService } from './../day/dayInfo.service';
import { Event } from 'src/app/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  event: Event = new Event();

  constructor(private http: DayInfoService, private router: Router) { }

  ngOnInit() {
    this.event = JSON.parse(JSON.stringify(this.http.eventDetail));
  }

  updateEvent(): void {
    this.http.updateEvent(this.event).subscribe((response) => {
      this.router.navigate(['/calendar']);
    });
  }

  createEvent(): void {
    this.http.createEvent(this.event).subscribe((response) => {
      this.router.navigate(['/calendar']);
    });
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
