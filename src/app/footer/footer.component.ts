// Author - Padmesh Donthu
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class FooterComponent implements OnInit {
  mediaSubscribe: Subscription;
  deviceXs: boolean;
  constructor(private router: Router, private mediaObserver: MediaObserver) {}
  ngOnDestroy(): void {
    this.mediaSubscribe.unsubscribe();
  }

  ngOnInit(): void {
    this.mediaSubscribe = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        this.deviceXs = result.mqAlias === 'xs' ? true : false;
      }
    );
  }
  openAttemptHistory() {
    this.router.navigate(['attemptHistory']);
  }
}
