import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAndSignupDialogComponent } from './login-and-signup-dialog.component';

describe('LoginAndSignupDialogComponent', () => {
  let component: LoginAndSignupDialogComponent;
  let fixture: ComponentFixture<LoginAndSignupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAndSignupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAndSignupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
