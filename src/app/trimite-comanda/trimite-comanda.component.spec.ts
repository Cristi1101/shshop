import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrimiteComanda } from './trimite-comanda.component';

describe('TrimiteComanda', () => {
  let component: TrimiteComanda;
  let fixture: ComponentFixture<TrimiteComanda>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrimiteComanda ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrimiteComanda);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
