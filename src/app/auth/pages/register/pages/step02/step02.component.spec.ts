import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step02Component } from './step02.component';

describe('Step02Component', () => {
  let component: Step02Component;
  let fixture: ComponentFixture<Step02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step02Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
