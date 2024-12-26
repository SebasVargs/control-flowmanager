import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoMapsComponent } from './todo-maps.component';

describe('TodoMapsComponent', () => {
  let component: TodoMapsComponent;
  let fixture: ComponentFixture<TodoMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoMapsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
