import { TestBed } from '@angular/core/testing';

import { ProtectieLinkUtilizator } from './protectie-link-utilizator.service';

describe('ProtectieLinkUtilizator', () => {
  let service: ProtectieLinkUtilizator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtectieLinkUtilizator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
