// Author- Padmesh Donthu
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login-and-signup-dialog',
  templateUrl: './login-and-signup-dialog.component.html',
  styleUrls: ['./login-and-signup-dialog.component.css'],
})
export class LoginAndSignupDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LoginAndSignupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
