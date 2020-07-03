import { TestBed } from '@angular/core/testing';

import { ServiciuProduse } from './serviciu-produse.service';

describe('ServiciuProduse', () => {
  let service: ServiciuProduse;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciuProduse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
