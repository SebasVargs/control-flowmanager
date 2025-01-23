import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCalendarComponent } from './assign-calendar.component';

describe('AssignCalendarComponent', () => {
  let component: AssignCalendarComponent;
  let fixture: ComponentFixture<AssignCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
