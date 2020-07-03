import { TestBed } from '@angular/core/testing';

import { ServiciuCulori } from './serviciu-culori.service';

describe('ServiciuCulori', () => {
  let service: ServiciuCulori;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciuCulori);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
