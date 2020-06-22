import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyMastersComponent } from './why-masters.component';

describe('WhyMastersComponent', () => {
  let component: WhyMastersComponent;
  let fixture: ComponentFixture<WhyMastersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyMastersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyMastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
