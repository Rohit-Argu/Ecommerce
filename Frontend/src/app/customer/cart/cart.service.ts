import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { CartProduct1Model } from "src/app/shared/model/CartProduct.model";
import { CartProductModel } from "src/app/shared/model/cart.product.model";
import { ProductModel } from "src/app/shared/model/product.model";

@Injectable({providedIn:'root'})
export class CartService implements OnInit{
    itemChanges1=new Subject<CartProductModel[]>();
    itemChanges=new Subject<any>();
    items: CartProductModel[]=[];

    allItems!:CartProduct1Model;
  constructor(private http: HttpClient){}

    ngOnInit(): void {
      
    }
    fetchCart(){
      return this.http.get<CartProduct1Model>('http://localhost:8080/api/v1/cart/viewCart')
    }
      getItems(){
        console.log(this.allItems);
        return this.items.slice();
      }
      addToCart(p:ProductModel,q:number){
        // console.log(p);
        // this.items.push({
        //     img: p.img,
        //     category: p.name,
        //     name: p.name,
        //     price: p.price,
        //     quantity: q>0?q:1
        // });
        // this.itemChanges.next(this.items.slice());
      }
      removeFromCart(i:number){
        this.items.splice(i,1);
        this.itemChanges1.next(this.items.slice());
      }
      emptyCart(){
        this.items=[];
        this.itemChanges1.next(this.items.slice());
      }
      getTotalQuantity(){
        let sum=0;
        for(let item of this.items){
          sum=sum+item.quantity;
        }
        return sum;
      }
      itemChanged(){
        this.itemChanges.next('');
      }
      deleteItem(i:number){

      }
      decreaseItemQuantity(i:number){
        this.http.post('http://localhost:8080/api/v1/cart/addToCart/'+i+'/-1',{}).subscribe(
          (data)=>{
            this.itemChanges.next('');
          }
        );
      }
      increaseItemQuantity(i:number){
        this.http.post('http://localhost:8080/api/v1/cart/addToCart/'+i+'/1',{}).subscribe(
          (data)=>{
            this.itemChanges.next('');
          }
        );
      }
}