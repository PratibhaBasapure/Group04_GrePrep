//  Author: Pratibha B(B00847415)
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormGroupDirective,
  NgForm,
  FormBuilder,
} from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from '../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(
      control &&
      control.parent &&
      control.parent.invalid &&
      control.parent.dirty
    );

    return invalidCtrl || invalidParent;
  }
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ForgotPasswordComponent implements OnInit {
  userDetails: User = { email: '', password: '' };
  matcher = new MyErrorStateMatcher();
  forgotPasswordForm: FormGroup;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  hide = true;
  serverErrorMessages: string;
  constructor(
    private location: Location,
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.pattern(this.emailRegex),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validator: this.checkPasswords }
    );
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.forgotPasswordForm.controls[controlName].hasError(errorName);
  };

  resetPassword() {
    if (this.forgotPasswordForm.invalid) {
      return;
    } else {
      this.userDetails.password = this.forgotPasswordForm.controls[
        'password'
      ].value;
      this.userDetails.email = this.forgotPasswordForm.controls['email'].value;
      this.userService.updateUserPassword(this.userDetails).subscribe(
        (res) => {
          if (res == null) {
            this.serverErrorMessages =
              'You do not seem to be registered. Please check your email';
            return;
          }
          this.userService.logout();
          alert(
            'Password updated successfully. Please login using new password to continue.'
          );
        },
        (err) => {
          this._snackBar.open(
            'Something went wrong. Unable to update. Please try later !!',
            '',
            { duration: 300 }
          );
        }
      );
    }
  }

  onCancel() {
    this.location.back;
  }
  forgotPassword() {
    this.router.navigate(['/']);
  }
  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }
}
