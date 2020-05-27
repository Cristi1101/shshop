import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecenziiUserComponent } from './recenzii-user.component';

describe('RecenziiUserComponent', () => {
  let component: RecenziiUserComponent;
  let fixture: ComponentFixture<RecenziiUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecenziiUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecenziiUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
