import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrareComenziDetalii } from './administrare-comenzi-detalii.component';

describe('AdministrareComenziDetalii', () => {
  let component: AdministrareComenziDetalii;
  let fixture: ComponentFixture<AdministrareComenziDetalii>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrareComenziDetalii ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrareComenziDetalii);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
