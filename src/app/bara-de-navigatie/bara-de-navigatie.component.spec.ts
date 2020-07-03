import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaraDeNavigatie } from './bara-de-navigatie.component';

describe('BaraDeNavigatie', () => {
  let component: BaraDeNavigatie;
  let fixture: ComponentFixture<BaraDeNavigatie>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaraDeNavigatie ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaraDeNavigatie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
