import { TestBed } from '@angular/core/testing';

import { ServiciuComenzi } from './serviciu-comenzi.service';

describe('ServiciuComenzi', () => {
  let service: ServiciuComenzi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciuComenzi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
