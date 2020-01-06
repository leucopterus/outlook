import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { Observable } from 'rxjs';
import { User } from './../../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [RegistrationService],
})
export class RegistrationComponent implements OnInit {

  profileForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private http: RegistrationService,
              private router: Router) {}

  onSubmit() {
    // console.log(this.profileForm.value);
    this.createUser(this.profileForm.value);
  }

  createUser(user: User) {
    this.http.registerUser(user).subscribe();
    this.router.navigate(['']);
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['calendar']);
    }
  }
}
