import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressPaymentComponent } from './address-payment.component';

describe('AddressPaymentComponent', () => {
  let component: AddressPaymentComponent;
  let fixture: ComponentFixture<AddressPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddressPaymentComponent]
    });
    fixture = TestBed.createComponent(AddressPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
