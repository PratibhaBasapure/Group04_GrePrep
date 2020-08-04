//  Author: Pratibha B(B00847415)
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatAccordion } from '@angular/material/expansion';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../services/user.service';
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

declare var M: any;

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css'],
})
export class ProfileSettingsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  userDetails: User = { firstName: '', mobileNumber: 0 };
  firstName: string = 'queen elizabeth';
  contactNum: number = 9023456789;

  signupForm: FormGroup;
  contactNumberForm: FormGroup;
  passwordChangeForm: FormGroup;

  submitted = false;
  hide = true;

  makeFirstNameEditable = false;
  makeContactNumberEditable = false;

  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
    });
    this.contactNumberForm = this.formBuilder.group({
      mobileNum: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
    this.passwordChangeForm = this.formBuilder.group(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validator: this.checkPasswords }
    );

    this.userService.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res['user'];
      },
      (err) => {}
    );
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.signupForm.controls[controlName].hasError(errorName);
  };
  public hasErrorInContactNum = (controlName: string, errorName: string) => {
    return this.contactNumberForm.controls[controlName].hasError(errorName);
  };
  public hasErrorInChangePassword = (
    controlName: string,
    errorName: string
  ) => {
    return this.passwordChangeForm.controls[controlName].hasError(errorName);
  };
  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }
  submitUserName() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    } else {
      this.makeFirstNameEditable = false;
      this.userDetails.firstName = this.signupForm.controls['firstName'].value;
      this.userService.updateUserDetails(this.userDetails).subscribe(
        (res) => {
          this._snackBar.open('Updated successfully !!', '', {
            duration: 1000,
          });
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
  editUserName() {
    this.makeFirstNameEditable = true;
  }
  cancelUserName() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    } else {
      this.makeFirstNameEditable = false;
    }
  }
  submitContactNumber() {
    if (this.contactNumberForm.invalid) {
      return;
    } else {
      this.makeContactNumberEditable = false;
      this.userDetails.mobileNumber = this.contactNumberForm.controls[
        'mobileNum'
      ].value;
      this.userService.updateUserDetails(this.userDetails).subscribe(
        (res) => {
          this._snackBar.open('Updated successfully !!', '', {
            duration: 1000,
          });
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
  editContactNumber() {
    this.makeContactNumberEditable = true;
  }
  cancelMobileNumber() {
    this.submitted = true;
    if (this.contactNumberForm.invalid) {
      return;
    } else {
      this.makeContactNumberEditable = false;
    }
  }
  submitPassword() {
    if (this.passwordChangeForm.invalid) {
      return;
    } else {
      this.userDetails.password = this.passwordChangeForm.controls[
        'password'
      ].value;
      this.userService.updateUserPassword(this.userDetails).subscribe(
        (res) => {
          this._snackBar.open('', '', { duration: 1000 });
          alert(
            'Password updated successfully. Please log in again to continue.'
          );
          this.userService.logout();
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

  deleteUserAccount() {
    if (confirm('Are you sure to delete your account ?') == true) {
      this.userDetails.email = this.userService.getUserEmail();
      this.userService.deleteUserAccount(this.userDetails).subscribe((res) => {
        alert(
          'Deleted successfully. Thank you for availing GREPrep Service. Have a bright future.'
        );
        this.userService.logout();
      });
    }
  }
}
