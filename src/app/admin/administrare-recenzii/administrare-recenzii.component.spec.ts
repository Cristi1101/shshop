import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrareRecenzii } from './administrare-recenzii.component';

describe('AdministrareRecenzii', () => {
  let component: AdministrareRecenzii;
  let fixture: ComponentFixture<AdministrareRecenzii>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrareRecenzii ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrareRecenzii);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
