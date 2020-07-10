import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComandaEfectuata } from './comanda-efectuata.component';

describe('ComandaEfectuata', () => {
  let component: ComandaEfectuata;
  let fixture: ComponentFixture<ComandaEfectuata>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComandaEfectuata ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComandaEfectuata);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
