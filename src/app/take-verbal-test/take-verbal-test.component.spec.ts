import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeVerbalTestComponent } from './take-verbal-test.component';

describe('TakeVerbalTestComponent', () => {
  let component: TakeVerbalTestComponent;
  let fixture: ComponentFixture<TakeVerbalTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeVerbalTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeVerbalTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
