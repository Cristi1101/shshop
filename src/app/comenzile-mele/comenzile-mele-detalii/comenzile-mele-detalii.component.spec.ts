import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComenzileMeleDetalii } from './comenzile-mele-detalii.component';

describe('ComenzileMeleDetalii', () => {
  let component: ComenzileMeleDetalii;
  let fixture: ComponentFixture<ComenzileMeleDetalii>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComenzileMeleDetalii ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComenzileMeleDetalii);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
