import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { HttpService } from './http.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [HttpService],
})
export class UserComponent implements OnInit {

  user: User;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getData().subscribe((data: User) => this.user = data);
  }

}
