import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContulMeuModificari } from './contul-meu-modificari.component';

describe('ContulMeuModificari', () => {
  let component: ContulMeuModificari;
  let fixture: ComponentFixture<ContulMeuModificari>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContulMeuModificari ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContulMeuModificari);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
