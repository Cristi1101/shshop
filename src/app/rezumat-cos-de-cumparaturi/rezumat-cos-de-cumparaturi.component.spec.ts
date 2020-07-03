import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RezumatCosDeCumparaturi } from './rezumat-cos-de-cumparaturi.component';

describe('RezumatCosDeCumparaturi', () => {
  let component: RezumatCosDeCumparaturi;
  let fixture: ComponentFixture<RezumatCosDeCumparaturi>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezumatCosDeCumparaturi ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezumatCosDeCumparaturi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
