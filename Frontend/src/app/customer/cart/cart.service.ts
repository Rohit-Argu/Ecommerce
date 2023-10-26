import { EventEmitter, Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { CartProductModel } from "src/app/shared/model/cart.product.model";
import { ProductModel } from "src/app/shared/model/product.model";

@Injectable({providedIn:'root'})
export class CartService{
    itemChanges=new Subject<CartProductModel[]>();
    items: CartProductModel[]=[];
      getItems(){
        return this.items.slice();
      }
      addToCart(p:ProductModel,q:number){
        console.log(p);
        this.items.push({
            img: p.img,
            category: p.category,
            name: p.name,
            price: p.price,
            quantity: q>0?q:1
        });
        this.itemChanges.next(this.items.slice());
      }
      removeFromCart(i:number){
        this.items.splice(i,1);
        this.itemChanges.next(this.items.slice());
      }
      emptyCart(){
        this.items=[];
        this.itemChanges.next(this.items.slice());
      }
      getTotalQuantity(){
        let sum=0;
        for(let item of this.items){
          sum=sum+item.quantity;
        }
        return sum;
      }
}