import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoWorkoutComponent } from './info-workout.component';

describe('InfoWorkoutComponent', () => {
  let component: InfoWorkoutComponent;
  let fixture: ComponentFixture<InfoWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoWorkoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
