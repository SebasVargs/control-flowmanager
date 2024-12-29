import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfViewComponent } from './interf-view.component';

describe('InterfViewComponent', () => {
  let component: InterfViewComponent;
  let fixture: ComponentFixture<InterfViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterfViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterfViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
