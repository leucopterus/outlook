import { LoginService } from './login.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private http: LoginService,
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['calendar']);
    }
    // console.log(localStorage.getItem('token'));
  }

  onSubmit() {
    this.http.loginUser(this.loginForm.value).subscribe((data) => {
      localStorage.setItem('token', data.key);
      this.router.navigate(['']);
    },
    (error) => {
      if ( +error.status >= 400 && +error.status < 500) {
        this.toastr.warning('Please, check your login and password');
      } else {
        this.toastr.error('There is no response from the server, please, try to access to it a little bit later');
      }
    });
  }
}
