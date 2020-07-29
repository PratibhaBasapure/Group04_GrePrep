import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeQuantTestComponent } from './take-quant-test.component';

describe('TakeQuantTestComponent', () => {
  let component: TakeQuantTestComponent;
  let fixture: ComponentFixture<TakeQuantTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeQuantTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeQuantTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
