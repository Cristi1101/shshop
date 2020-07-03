import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecenziileMeleModificare } from './recenziile-mele-verificare.component';

describe('RecenziileMeleModificare', () => {
  let component: RecenziileMeleModificare;
  let fixture: ComponentFixture<RecenziileMeleModificare>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecenziileMeleModificare ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecenziileMeleModificare);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
