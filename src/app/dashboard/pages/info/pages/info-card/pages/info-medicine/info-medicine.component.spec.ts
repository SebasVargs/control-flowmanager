import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMedicineComponent } from './info-medicine.component';

describe('InfoMedicineComponent', () => {
  let component: InfoMedicineComponent;
  let fixture: ComponentFixture<InfoMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoMedicineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
