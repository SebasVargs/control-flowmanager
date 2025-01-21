import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDevelopmentComponent } from './info-development.component';

describe('InfoDevelopmentComponent', () => {
  let component: InfoDevelopmentComponent;
  let fixture: ComponentFixture<InfoDevelopmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoDevelopmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
