import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { OrdersModel } from "src/app/shared/model/orders.model";
import { CartService } from "../cart/cart.service";
import { OrderDetailsModel } from "src/app/shared/model/order.details.model";
import { CartProductModel } from "src/app/shared/model/cart.product.model";

@Injectable({providedIn:'root'})
export class OrdersService{

  constructor(private cartService:CartService){}

  ordersChanged=new EventEmitter<OrdersModel[]>()
  orderDetailsChanged=new EventEmitter<OrderDetailsModel[]>()
    orders:OrdersModel[]=[];
      orderDetails: OrderDetailsModel[]=[];
      getOrders(){
        return this.orders.slice();
      }
      getOrderDetails(){
        return this.orderDetails.slice();
      }
  addOrder(order:OrdersModel,products: CartProductModel[]){
    this.orders.push(order);
    this.ordersChanged.emit(this.orders.slice());
    let orderDetail:OrderDetailsModel={
      products:[],
      totalPrice: order.totalPrice,
      deliveryDate: new Date()
    }
    for( let product of products){
      orderDetail.products.push({
        img: product.img,
        category: product.category,
        name:product.name,
        price: product.price,
        quantity:product.quantity
      })
    }
    this.orderDetails.push(orderDetail);
    this.orderDetailsChanged.emit(this.orderDetails.slice());
    
    this.cartService.emptyCart();
  }
}