import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent implements OnInit, OnDestroy {
  mediaSubscribe: Subscription;
  deviceXs: boolean;
  isLoggedIn:any;
  constructor(private router: Router, private mediaObserver: MediaObserver, private userService:UserService) {}
  ngOnDestroy(): void {
    this.mediaSubscribe.unsubscribe();
  }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    console.log(this.isLoggedIn);
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
    this.userService.deleteToken();    
    this.router.navigate(['/login']);
  }
  openMySchools() {
    this.router.navigate(['/profile/mySchools']);
  }
}
