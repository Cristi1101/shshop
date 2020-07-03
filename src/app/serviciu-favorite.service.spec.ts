import { TestBed } from '@angular/core/testing';

import { ServiciuFavorite } from './serviciu-favorite.service';

describe('ServiciuFavorite', () => {
  let service: ServiciuFavorite;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciuFavorite);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
