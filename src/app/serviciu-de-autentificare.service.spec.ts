import { TestBed } from '@angular/core/testing';

import { ServiciuDeAutentificare } from './serviciu-de-autentificare.service';

describe('ServiciuDeAutentificare', () => {
  let service: ServiciuDeAutentificare;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciuDeAutentificare);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
