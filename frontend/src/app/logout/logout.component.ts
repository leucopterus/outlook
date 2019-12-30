import { LogoutService } from './logout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  providers: [LogoutService]
})
export class LogoutComponent implements OnInit {

  constructor(private http: LogoutService) { }

  ngOnInit() {
    this.http.logoutUser();
    localStorage.removeItem('token');
  }
}
