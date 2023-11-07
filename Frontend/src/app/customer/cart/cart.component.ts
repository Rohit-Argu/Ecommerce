import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { OrdersService } from '../orders/orders.service';
import { OrdersModel } from 'src/app/shared/model/orders.model';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ErrorHandlerService } from 'src/app/errorHandler.service';
import { CartProduct1Model } from 'src/app/shared/model/CartProduct.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  totalQ:number=0;
  items: CartProduct1Model={
    id:0,
    cartDetails:[],
    amount:0
  };
  

  constructor(private error:ErrorHandlerService,private location: Location,private cartService: CartService,private ordersService:OrdersService,private router: Router,private userService:UserService){}
  

  ngOnInit(): void {
    
    this.cartService.fetCart1();
    this.cartService.itemChanges.subscribe(
      (data)=>{
        this.items=data;
        this.items.amount.toFixed(2);
      }
    )
    console.log('in cart');
  }
  onChanges(){
   
  }

  onQuantityDecrease(i:number){
    if(this.items.cartDetails[i].quantity===1){
      this.cartService.deleteItem(i);
    }
    else
    this.cartService.decreaseItemQuantity(this.items.cartDetails[i].product.id);
  // this.cartService.itemChanged();
  }
  onQuantityIncrease(i:number){
    if(this.items.cartDetails[i].quantity===5){
      alert("Cannot Add Anymore item");
    }
    else{
      this.cartService.increaseItemQuantity(this.items.cartDetails[i].product.id);
    }
    
  // this.cartService.itemChanged();
  }

  goBack(){
    this.location.back();
  }
  removeFromCart(i:number){
    this.cartService.removeFromCart(i);
  }
  onBuy(){
    const order:OrdersModel={
      numberOfItems: this.items.cartDetails.length,
      totalPrice: this.items.amount,
      deliveryStatus: "Shipping",
      show: false
    };
    this.ordersService.addOrder(order,this.items);
    this.router.navigate(['orders'])
  }
  emptyCart(){
    this.cartService.emptyCart();
  }

}
