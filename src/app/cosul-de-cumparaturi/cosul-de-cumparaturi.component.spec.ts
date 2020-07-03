import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CosulDeCumparaturi } from './cosul-de-cumparaturi.component';

describe('CosulDeCumparaturi', () => {
  let component: CosulDeCumparaturi;
  let fixture: ComponentFixture<CosulDeCumparaturi>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosulDeCumparaturi ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CosulDeCumparaturi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
