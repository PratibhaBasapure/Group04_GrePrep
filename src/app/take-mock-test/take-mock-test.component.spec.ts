import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeMockTestComponent } from './take-mock-test.component';

describe('TakeMockTestComponent', () => {
  let component: TakeMockTestComponent;
  let fixture: ComponentFixture<TakeMockTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeMockTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeMockTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
