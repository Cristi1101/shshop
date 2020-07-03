import { TestBed } from '@angular/core/testing';

import { ServiciuCategorii } from './serviciu-categorii.service';

describe('ServiciuCategorii', () => {
  let service: ServiciuCategorii;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciuCategorii);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
