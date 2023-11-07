import { HttpClient, HttpHeaders } from "@angular/common/http";
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

    quantity:number=0;
    allItems:CartProduct1Model={
      id:0,
      cartDetails:[],
      amount:0
    };
  constructor(private http: HttpClient){}

    ngOnInit(): void {
      
    }
    fetCart1(){
      this.http.get<CartProduct1Model>('http://localhost:8080/api/v1/cart/viewCart').subscribe(
        (data)=>{
          this.allItems=data;
          this.itemChanges.next(data);
        }
      )
    }
    fetchCart(){
      return this.allItems;
    }
      getItems(){
        console.log(this.allItems);
        return this.items.slice();
      }
      addToCart(i:number,q:number){
        this.http.post('http://localhost:8080/api/v1/cart/addToCart/'+i+'/'+q,{}).subscribe(
          (data)=>{
            console.log(data);
            this.fetCart1();
          })
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
        const headers=new HttpHeaders().set('Content-Type','text/plain; charset=utf-8');
        this.http.delete('http://localhost:8080/api/v1/cart/emptyCart',{
          headers,responseType:'text'
        }).subscribe(
          (data)=>{
            console.log(data);
            this.fetCart1();
          });
      }
      getQuantity(){
        for(let cd of this.allItems.cartDetails)
          this.quantity+=cd.quantity;
          console.log(this.quantity);
          return this.quantity;
      }
      deleteItem(i:number){

      }
      decreaseItemQuantity(i:number){
        this.http.post('http://localhost:8080/api/v1/cart/addToCart/'+i+'/-1',{}).subscribe(
          (data)=>{
            this.fetCart1();
          }
        );
      }
      increaseItemQuantity(i:number){
        this.http.post('http://localhost:8080/api/v1/cart/addToCart/'+i+'/1',{}).subscribe(
          (data)=>{
            this.fetCart1();
          }
        );
      }
}