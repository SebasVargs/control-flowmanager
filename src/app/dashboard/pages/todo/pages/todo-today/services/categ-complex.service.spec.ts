import { TestBed } from '@angular/core/testing';

import { CategComplexService } from './categ-complex.service';

describe('CategComplexService', () => {
  let service: CategComplexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategComplexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
