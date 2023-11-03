import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { OrdersModel } from "src/app/shared/model/orders.model";
import { CartService } from "../cart/cart.service";
import { OrderDetailsModel } from "src/app/shared/model/order.details.model";
import { CartProductModel } from "src/app/shared/model/cart.product.model";
import { User2Model } from "src/app/shared/model/user2.model";
import { CartProduct1Model } from "src/app/shared/model/CartProduct.model";

@Injectable({providedIn:'root'})
export class OrdersService{

  constructor(private cartService:CartService){}

  ordersChanged=new Subject<OrdersModel[]>()
  orderDetailsChanged=new Subject<OrderDetailsModel[]>()
    orders:OrdersModel[]=[];
      orderDetails: OrderDetailsModel[]=[];
      getOrders(){
        return this.orders.slice();
      }
      getOrderDetails(){
        return this.orderDetails.slice();
      }
  addOrder(order:OrdersModel,products: CartProduct1Model){
    this.orders.push(order);
    this.ordersChanged.next(this.orders.slice());
    let orderDetail:OrderDetailsModel={
      products:[],
      totalPrice: order.totalPrice,
      deliveryDate: new Date()
    }
    for( let product of products.cartDetails){
      orderDetail.products.push({
        img: '',
        category: '',
        name:product.product.name,
        price: product.product.price,
        quantity:product.quantity
      })
    }
    this.orderDetails.push(orderDetail);
    this.orderDetailsChanged.next(this.orderDetails.slice());
    
    this.cartService.emptyCart();
  }
  
}