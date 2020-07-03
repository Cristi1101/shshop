import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContulMeu } from './contul-meu.component';

describe('ContulMeu', () => {
  let component: ContulMeu;
  let fixture: ComponentFixture<ContulMeu>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContulMeu ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContulMeu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
