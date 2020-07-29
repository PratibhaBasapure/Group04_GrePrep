//  Author: Pratibha B(B00847415)
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm,
  FormBuilder,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginAndSignupDialogComponent } from '../login-and-signup-dialog/login-and-signup-dialog.component';
import { UserService } from '../services/user.service';

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
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RegistrationComponent implements OnInit {
  signupForm: FormGroup;

  hide = true;

  matcher = new MyErrorStateMatcher();
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(this.emailRegex)]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
        mobileNumber: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('[6-9]\\d{9}'),
        ]),
      },
      { validator: this.checkPasswords }
    );
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.signupForm.controls[controlName].hasError(errorName);
  };

  signup() {
    this.userService.postUser(this.signupForm.value).subscribe(
      res => {
        const dialogRef = this.dialog.open(LoginAndSignupDialogComponent, {
      width: '500px',
      data: {
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        mobileNumber: this.signupForm.value.mobileNumber,
        email: this.signupForm.value.email,
        password:'Registered successfully. Please login to continue',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(['login']);
    });
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );  
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }
}
