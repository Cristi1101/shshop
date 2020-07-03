import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrareUtilizatori } from './administrare-utilizatori.component';

describe('AdministrareUtilizatori', () => {
  let component: AdministrareUtilizatori;
  let fixture: ComponentFixture<AdministrareUtilizatori>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrareUtilizatori ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrareUtilizatori);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
