import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltruProduse } from './filtru-produse.component';

describe('FiltruProduse', () => {
  let component: FiltruProduse;
  let fixture: ComponentFixture<FiltruProduse>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltruProduse ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltruProduse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
