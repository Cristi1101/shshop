import { TestBed } from '@angular/core/testing';

import { ServiciuSubcategorii } from './serviciu-subcategorii.service';

describe('ServiciuSubcategorii', () => {
  let service: ServiciuSubcategorii;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciuSubcategorii);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
