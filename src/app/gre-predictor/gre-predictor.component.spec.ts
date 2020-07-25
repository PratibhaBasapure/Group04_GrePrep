// Author- Neelesh Singh
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrePredictorComponent } from './gre-predictor.component';

describe('GrePredictorComponent', () => {
  let component: GrePredictorComponent;
  let fixture: ComponentFixture<GrePredictorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrePredictorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrePredictorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
