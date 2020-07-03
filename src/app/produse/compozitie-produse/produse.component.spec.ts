import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Produse } from './produse.component';

describe('Produse', () => {
  let component: Produse;
  let fixture: ComponentFixture<Produse>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Produse ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Produse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
