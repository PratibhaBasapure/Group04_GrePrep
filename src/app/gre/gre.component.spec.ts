import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreComponent } from './gre.component';

describe('GreComponent', () => {
  let component: GreComponent;
  let fixture: ComponentFixture<GreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
