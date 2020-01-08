import { LoginService } from './login.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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
              private router: Router) {}

  onSubmit() {
    this.http.loginUser(this.loginForm.value).subscribe(data => {
      console.log(data);
      localStorage.setItem('token', data.key);
      this.router.navigate(['']);
    });
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['calendar']);
    }
    console.log(localStorage.getItem('token'));
  }
}
