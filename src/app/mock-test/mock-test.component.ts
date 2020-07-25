// Author - Padmesh Donthu
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mock-test',
  templateUrl: './mock-test.component.html',
  styleUrls: [
    '../../../node_modules/materialize-css/dist/css/materialize.min.css',
    './mock-test.component.css',
  ],
  encapsulation: ViewEncapsulation.Emulated,
})
export class MockTestComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  // Method to navigate the user to take mock test page
  next() {
    this.router.navigate(['takeMockTest'], { relativeTo: this.route });
  }
}
