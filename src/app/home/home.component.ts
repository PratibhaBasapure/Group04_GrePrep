// Author - Abhinav Ramesh
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    '../../../node_modules/materialize-css/dist/css/materialize.min.css',
    './home.component.css',
  ],
  encapsulation: ViewEncapsulation.Emulated,
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {}
}
