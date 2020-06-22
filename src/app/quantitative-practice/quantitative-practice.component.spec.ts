import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitativePracticeComponent } from './quantitative-practice.component';

describe('QuantitativePracticeComponent', () => {
  let component: QuantitativePracticeComponent;
  let fixture: ComponentFixture<QuantitativePracticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantitativePracticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantitativePracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
