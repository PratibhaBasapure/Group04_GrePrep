import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quantitative-practice',
  templateUrl: './quantitative-practice.component.html',
  styleUrls: ['./quantitative-practice.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class QuantitativePracticeComponent implements OnInit {

  form: FormGroup;
  constructor(private router: Router) { }
  ngOnInit() {
    this.form = new FormGroup({
      myCheckboxGroup: new FormGroup({
        myCheckbox1: new FormControl(false),
        myCheckbox2: new FormControl(false),
        myCheckbox3: new FormControl(false),
      }),
    });

  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    else {
     this.router.navigate(["/quiz"]);
    }
  }

}