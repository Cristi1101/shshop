import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComenzileMele } from './comenzile-mele.component';

describe('ComenzileMele', () => {
  let component: ComenzileMele;
  let fixture: ComponentFixture<ComenzileMele>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComenzileMele ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComenzileMele);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
