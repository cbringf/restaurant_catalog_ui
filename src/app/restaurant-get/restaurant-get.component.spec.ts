import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantGetComponent } from './restaurant-get.component';

describe('RestaurantGetComponent', () => {
  let component: RestaurantGetComponent;
  let fixture: ComponentFixture<RestaurantGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
