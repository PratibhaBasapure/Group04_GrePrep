import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
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
    this.router.navigateByUrl('/attemptHistory');
  }
  logout() {
    this.router.navigateByUrl('/login');
  }
}
