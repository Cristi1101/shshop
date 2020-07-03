import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaliiProduse } from './detalii-produse.component';

describe('DetaliiProduse', () => {
  let component: DetaliiProduse;
  let fixture: ComponentFixture<DetaliiProduse>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetaliiProduse ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaliiProduse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
