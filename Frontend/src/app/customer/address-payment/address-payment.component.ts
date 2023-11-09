import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/shared/model/Order.model';
import { OrderDetails1Model } from 'src/app/shared/model/orderDetails1.model';
import { CartService } from '../cart/cart.service';
import { CartProduct1Model } from 'src/app/shared/model/CartProduct.model';
import { UserService } from '../user.service';
import { AddressModel } from 'src/app/shared/model/address.model';
import { FormControl, Validators } from '@angular/forms';
import { OrdersService } from '../orders/orders.service';

@Component({
  selector: 'app-address-payment',
  templateUrl: './address-payment.component.html',
  styleUrls: ['./address-payment.component.css']
})
export class AddressPaymentComponent implements OnInit{



  index:number=0;
  orderDetails: OrderDetails1Model[]=[];
  orders:OrderModel[]=[];
  details!:CartProduct1Model;
  
  paymentIndex:number=0;
  payment=['COD','UPI','NetBanking','CreditCard','DebitCard'];

  addresses:AddressModel[]=[{
    country: '',
    district: '',
    houseNo: 0,
    id: 0,
    locality: '',
    order: [],
    pincode: 0,
    state: '',
    user: {
      accountNonExpired: false,
      accountNonLocked: false,
      authorities: [{}],
      createdAt: '',
      credentialsNonExpired: false,
      email: '',
      enabled: false,
      firstName: '',
      id: 0,
      lastName: '',
      password: '',
      phone: '',
      role: '',
      username: ''
    }
  }];
  address:number=0;

  constructor(private cartService:CartService,private userService:UserService, private orderService:OrdersService){}

  ngOnInit(): void {
    this.details=this.cartService.fetchCart();
    console.log(this.details);
    this.userService.fetchAddresses();
    this.userService.addressesChanged.subscribe(
      (data)=>{
        this.addresses=data;
      }
    );
  }
  placeOrder(){
    this.orderService.placeOrder(this.addresses[this.address].id,this.payment[this.paymentIndex]);
  }

}
