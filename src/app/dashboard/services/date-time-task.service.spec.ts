import { TestBed } from '@angular/core/testing';

import { DateTimeTaskService } from './date-time-task.service';

describe('DateTimeTaskService', () => {
  let service: DateTimeTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateTimeTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
