import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrareUtilizatoriDetalii } from './administrare-utilizatori-detalii.component';

describe('AdministrareUtilizatoriDetalii', () => {
  let component: AdministrareUtilizatoriDetalii;
  let fixture: ComponentFixture<AdministrareUtilizatoriDetalii>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrareUtilizatoriDetalii ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrareUtilizatoriDetalii);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
