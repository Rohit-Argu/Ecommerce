import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartProductModel } from 'src/app/shared/model/cart.product.model';
import { ProductModel } from 'src/app/shared/model/product.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{


  items: CartProductModel[]=[];

  constructor(private location: Location,private cartService: CartService){}
  

  ngOnInit(): void {
    this.items=this.cartService.getItems();
    this.cartService.itemChanges.subscribe(
      (items:CartProductModel[])=>{
        this.items=items;
        console.log(this.items.length);
      }
    )
    console.log('in cart');
  }
  onChanges(){
    this.items=this.cartService.getItems();
  }

  onQuantityDecrease(i:number){
    if(this.items[i].quantity===1){
      this.items.splice(i,1);
    }
    else
    this.items[i].quantity--;
  }
  onQuantityIncrease(i:number){
    if(this.items[i].quantity===5){
      alert("Cannot add more than 5 of same item")
    }
    else
    this.items[i].quantity++;
  }

  getPrice(){
    let price:number=0;
    for(let item of this.items){
      price+=(item.price*item.quantity);
    }
    return price;
  }
  goBack(){
    this.location.back();
  }
  removeFromCart(i:number){
    this.cartService.removeFromCart(i);
  }

}
