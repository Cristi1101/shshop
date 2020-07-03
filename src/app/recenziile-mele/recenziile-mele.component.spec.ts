import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecenziileMele } from './recenziile-mele.component';

describe('RecenziileMele', () => {
  let component: RecenziileMele;
  let fixture: ComponentFixture<RecenziileMele>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecenziileMele ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecenziileMele);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
