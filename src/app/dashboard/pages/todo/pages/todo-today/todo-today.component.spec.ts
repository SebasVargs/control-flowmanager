import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoTodayComponent } from './todo-today.component';

describe('TodoTodayComponent', () => {
  let component: TodoTodayComponent;
  let fixture: ComponentFixture<TodoTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoTodayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
