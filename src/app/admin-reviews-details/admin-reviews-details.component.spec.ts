import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReviewsDetailsComponent } from './admin-reviews-details.component';

describe('AdminReviewsDetailsComponent', () => {
  let component: AdminReviewsDetailsComponent;
  let fixture: ComponentFixture<AdminReviewsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReviewsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReviewsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
