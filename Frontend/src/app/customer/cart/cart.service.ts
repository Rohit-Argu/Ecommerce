import { EventEmitter, Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { CartProductModel } from "src/app/shared/model/cart.product.model";
import { ProductModel } from "src/app/shared/model/product.model";

@Injectable({providedIn:'root'})
export class CartService{
    itemChanges=new EventEmitter<CartProductModel[]>();
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
        this.itemChanges.emit(this.items.slice());
      }
      removeFromCart(i:number){
        this.items.splice(i,1);
        this.itemChanges.emit(this.items.slice());
      }
}