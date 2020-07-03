import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Autentificare } from './autentificare.component';

describe('Autentificare', () => {
  let component: Autentificare;
  let fixture: ComponentFixture<Autentificare>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Autentificare ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Autentificare);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
