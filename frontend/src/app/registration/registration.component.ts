import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { User } from './../user';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [RegistrationService],
})
export class RegistrationComponent implements OnInit {

  profileForm: FormGroup;

  constructor(private http: RegistrationService, private router: Router, private toastr: ToastrService) {
    this.profileForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      passwordCheck: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ])
    });
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['calendar']);
    }
  }

  onSubmit() {
    const pass = this.profileForm.value.password;
    const passConf = this.profileForm.value.passwordCheck;
    if (pass === passConf) {
      delete this.profileForm.value.passwordCheck;
      this.createUser(this.profileForm.value);
    } else {
      this.toastr.error('Your passwords do not match, please fill them out with the same value');
    }
  }

  createUser(user: User) {
    this.http.registerUser(user).subscribe((response) => {
      this.router.navigate(['']);
    },
    (error) => {
      if ( +error.status >= 400 && +error.status < 500) {
        this.toastr.warning('Please, check your data in form');
      } else {
        this.toastr.error('There is no response from the server, please, try to access to it a little bit later');
      }
    });
  }
}
