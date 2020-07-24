import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatAccordion } from '@angular/material/expansion';
import { ErrorStateMatcher } from '@angular/material/core';
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
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  userDetails;
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
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
    });
    this.contactNumberForm = this.formBuilder.group({
      mobileNum: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
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
      res => {
        this.userDetails = res['user'];
        console.log("Detaisl"+this.userDetails);
      },
      err => {
        console.log(err);

      }
    );
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.signupForm.controls[controlName].hasError(errorName);
  };
  public hasErrorInContactNum = (controlName: string, errorName: string) => {
    return this.contactNumberForm.controls[controlName].hasError(errorName);
  };
  public hasErrorInChangePassword = (controlName: string, errorName: string) => {
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
    }
    else {
      this.makeFirstNameEditable = false;
      this.userDetails.firstName=this.signupForm.controls['firstName'].value;
      console.log(this.userDetails);
      this.userService.updateUserName(this.userDetails).subscribe(
        res => {
          // this.showSucessMessage = true;
         console.log("Error");
        },
        err => {
          console.log("Error");
          //  this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        }
      );
    }
  }
  editUserName() {
    this.makeFirstNameEditable = true;
  }

  submitContactNumber() {
    if (this.contactNumberForm.invalid) {
      console.log(this.contactNumberForm.controls["mobileNum"].errors);
      return;
    }
    else {
      this.makeContactNumberEditable = false;
    }
  }
  editContactNumber() {
    this.makeContactNumberEditable = true;
  }

  submitPassword() {
    if (this.passwordChangeForm.invalid) {
      return;
    }
  }
}