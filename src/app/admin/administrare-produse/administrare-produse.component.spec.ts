import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrareProduse } from './administrare-produse.component';

describe('AdministrareProduse', () => {
  let component: AdministrareProduse;
  let fixture: ComponentFixture<AdministrareProduse>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrareProduse ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrareProduse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
