import { DayInfoService } from './../day/dayInfo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
  providers: [DayInfoService],
})
export class SubscriptionComponent implements OnInit {

  constructor(private http: DayInfoService, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    console.log('In subscriptions');
    this.activatedRouter.paramMap.subscribe((params) => {
      this.http.joinEvent(params.get('id'), localStorage.getItem('token'));
    });
  }

}
