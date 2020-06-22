import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfSchoolsComponent } from './list-of-schools.component';

describe('ListOfSchoolsComponent', () => {
  let component: ListOfSchoolsComponent;
  let fixture: ComponentFixture<ListOfSchoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfSchoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
