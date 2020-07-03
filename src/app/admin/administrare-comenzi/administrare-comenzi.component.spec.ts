import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrareComenzi } from './administrare-comenzi.component';

describe('AdministrareComenzi', () => {
  let component: AdministrareComenzi;
  let fixture: ComponentFixture<AdministrareComenzi>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrareComenzi ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrareComenzi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
