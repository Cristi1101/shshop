import { TestBed } from '@angular/core/testing';

import { ServiciuCosDeCumparaturi } from './serviciu-cos-de-cumparaturi.service';

describe('ServiciuCosDeCumparaturi', () => {
  let service: ServiciuCosDeCumparaturi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciuCosDeCumparaturi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
