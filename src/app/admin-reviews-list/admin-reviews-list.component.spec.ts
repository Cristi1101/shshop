import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReviewsListComponent } from './admin-reviews-list.component';

describe('AdminReviewsListComponent', () => {
  let component: AdminReviewsListComponent;
  let fixture: ComponentFixture<AdminReviewsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReviewsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReviewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
