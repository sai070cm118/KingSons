import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AppConfig } from '../../config/appConfig';

import { NotificationService } from '../../tosterservice/notification.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading: Boolean;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router,
    private notificationService: NotificationService,
    private ngxUiLoaderService: NgxUiLoaderService
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.isLoading = true;
    this.ngxUiLoaderService.startBackgroundLoader('loginButtonLoader');
    this.authService.login(
      {
        Email: this.f.username.value,
        Password: this.f.password.value
      }
    )
    .subscribe(response => {
      console.log(response);
      this.isLoading = false;
      this.ngxUiLoaderService.stopBackgroundLoader('loginButtonLoader');
      if (response) {
        this.router.navigate([AppConfig.Dashboard_URL]);
      }
    });
  }

}
