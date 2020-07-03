import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogulProduselor } from './catalogul-produselor.component';

describe('CatalogulProduselor', () => {
  let component: CatalogulProduselor;
  let fixture: ComponentFixture<CatalogulProduselor>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogulProduselor ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogulProduselor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
