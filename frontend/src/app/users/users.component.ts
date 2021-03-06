import { Component, OnInit } from '@angular/core';
import { UserService } from './users.service';
import { User } from './../user';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService],
})
export class UsersComponent implements OnInit {
  userList: User[] = [];

  constructor(private http: UserService) {}

  ngOnInit() {
    return this.http.getUserList().subscribe((data: User[]) => this.userList = data);
  }
}
