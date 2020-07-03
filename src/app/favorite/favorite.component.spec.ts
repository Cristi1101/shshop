import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Favorite } from './favorite.component';

describe('Favorite', () => {
  let component: Favorite;
  let fixture: ComponentFixture<Favorite>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Favorite ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Favorite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
