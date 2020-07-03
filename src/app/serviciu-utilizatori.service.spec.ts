import { TestBed } from '@angular/core/testing';

import { ServiciuUtilizatori } from './serviciu-utilizatori.service';

describe('ServiciuUtilizatori', () => {
  let service: ServiciuUtilizatori;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciuUtilizatori);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
