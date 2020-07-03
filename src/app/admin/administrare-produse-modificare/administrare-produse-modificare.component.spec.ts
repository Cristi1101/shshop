import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrareProduseModificare } from './administrare-produse-modificare.component';

describe('AdministrareProduseModificare', () => {
  let component: AdministrareProduseModificare;
  let fixture: ComponentFixture<AdministrareProduseModificare>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrareProduseModificare ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrareProduseModificare);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
