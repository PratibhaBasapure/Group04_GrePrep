import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { LoginAndSignupDialogComponent } from '../login-and-signup-dialog/login-and-signup-dialog.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class LoginComponent implements OnInit {
  title = 'Login';

  loginForm: FormGroup;

  hide = true;
  serverErrorMessages: string;
  constructor(
    private location: Location,
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    if (this.userService.isLoggedIn()) this.router.navigate(['gre']);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (res) => {
        this.userService.setToken(res['token']);
        this.userService.setUserEmail(res['email']);
        this.router.navigate(['gre']);
      },
      (err) => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

  onCancel() {
    this.location.back;
  }
}
