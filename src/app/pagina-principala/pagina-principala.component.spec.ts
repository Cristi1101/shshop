import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPrincipala } from './pagina-principala.component';

describe('PaginaPrincipala', () => {
  let component: PaginaPrincipala;
  let fixture: ComponentFixture<PaginaPrincipala>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaPrincipala ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaPrincipala);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
