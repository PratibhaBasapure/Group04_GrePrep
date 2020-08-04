// Author - Padmesh Donthu
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class HeaderComponent implements OnInit, OnDestroy {
  mediaSubscribe: Subscription;
  deviceXs: boolean;
  isLoggedIn: any;

  // Inject dependecies here
  constructor(
    private router: Router,
    private mediaObserver: MediaObserver,
    private userService: UserService
  ) {}
  ngOnDestroy(): void {
    this.mediaSubscribe.unsubscribe();
  }

  // This is used to check if the user is logged in or not and also set the device size based
  // on which the header changes
  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.mediaSubscribe = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        this.deviceXs = result.mqAlias === 'xs' ? true : false;
      }
    );
  }
  // Method to open attempt history page
  openAttemptHistory() {
    this.router.navigate(['/attemptHistory']);
  }
  // Logs out the user from the current session
  logout() {
    this.userService.logout();
  }
  // Method to open user's favourite schools
  openMySchools() {
    this.router.navigate(['/profile/mySchools']);
  }
}
