import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoInvestingComponent } from './info-investing.component';

describe('InfoInvestingComponent', () => {
  let component: InfoInvestingComponent;
  let fixture: ComponentFixture<InfoInvestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoInvestingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoInvestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
