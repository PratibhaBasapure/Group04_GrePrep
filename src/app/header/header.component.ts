import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent implements OnInit, OnDestroy {
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
    this.router.navigate(['/attemptHistory']);
  }
  logout() {
    this.router.navigate(['/login']);
  }
  openMySchools() {
    this.router.navigate(['/profile/mySchools']);
  }
}
