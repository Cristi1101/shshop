import { TestBed } from '@angular/core/testing';

import { ServiciuRecenzii } from './serviciu-recenzii.service';

describe('ServiciuRecenzii', () => {
  let service: ServiciuRecenzii;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciuRecenzii);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
