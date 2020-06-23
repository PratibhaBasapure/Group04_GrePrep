import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mock-test',
  templateUrl: './mock-test.component.html',
  styleUrls: ['./mock-test.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MockTestComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}
  next() {
    this.router.navigate(['takeMockTest'], { relativeTo: this.route });
  }
}
