import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Inregistrare } from './inregistrare.component';

describe('Inregistrare', () => {
  let component: Inregistrare;
  let fixture: ComponentFixture<Inregistrare>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Inregistrare ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Inregistrare);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
