import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbalPracticeComponent } from './verbal-practice.component';

describe('VerbalPracticeComponent', () => {
  let component: VerbalPracticeComponent;
  let fixture: ComponentFixture<VerbalPracticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerbalPracticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbalPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
