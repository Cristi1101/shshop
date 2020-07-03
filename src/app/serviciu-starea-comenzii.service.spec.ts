import { TestBed } from '@angular/core/testing';

import { ServiciuStareaComenzii } from './serviciu-starea-comenzii.service';

describe('ServiciuStareaComenzii', () => {
  let service: ServiciuStareaComenzii;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciuStareaComenzii);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
