import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrdersDetailsComponent } from './my-orders-details.component';

describe('MyOrdersDetailsComponent', () => {
  let component: MyOrdersDetailsComponent;
  let fixture: ComponentFixture<MyOrdersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOrdersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrdersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
