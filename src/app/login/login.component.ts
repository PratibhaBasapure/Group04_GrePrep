import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { LoginAndSignupDialogComponent } from '../login-and-signup-dialog/login-and-signup-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title = 'Login';

  loginForm: FormGroup;

  hide = true;

  constructor(
    private location: Location,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      emailId: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  login() {
    console.log(this.loginForm.value.password);
    console.log(this.loginForm.value.emailId);

    const dialogRef = this.dialog.open(LoginAndSignupDialogComponent, {
      width: '500px',
      data: {
        email: this.loginForm.value.emailId,
        password: this.loginForm.value.password,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.router.navigate(['home']);
    });
  }

  onCancel() {
    this.location.back;
  }
}
