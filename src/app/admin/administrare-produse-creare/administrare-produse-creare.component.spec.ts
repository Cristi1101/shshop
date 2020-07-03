import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrareProduseCreare } from './administrare-produse-creare.component';

describe('AdministrareProduseCreare', () => {
  let component: AdministrareProduseCreare;
  let fixture: ComponentFixture<AdministrareProduseCreare>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrareProduseCreare ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrareProduseCreare);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
