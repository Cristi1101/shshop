import { TestBed } from '@angular/core/testing';

import { ProtectieLinkAdmin } from './protectie-link-admin.service';

describe('ProtectieLinkAdmin', () => {
  let service: ProtectieLinkAdmin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtectieLinkAdmin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
