import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { CartProductModel } from "src/app/shared/model/cart.product.model";
import { ProductModel } from "src/app/shared/model/product.model";

@Injectable({providedIn:'root'})
export class CartService implements OnInit{
    itemChanges=new Subject<CartProductModel[]>();
    items: CartProductModel[]=[];

  constructor(private http: HttpClient){}

    ngOnInit(): void {
      
    }
    fetchCart(){
    }
      getItems(){
        return this.items.slice();
      }
      addToCart(p:ProductModel,q:number){
        console.log(p);
        this.items.push({
            img: p.img,
            category: p.name,
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
      itemChanged(){
        this.itemChanges.next(this.items.slice())
      }
}