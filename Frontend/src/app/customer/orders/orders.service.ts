import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OrdersModel } from 'src/app/shared/model/orders.model';
import { CartService } from '../cart/cart.service';
import { OrderDetailsModel } from 'src/app/shared/model/order.details.model';
import { CartProductModel } from 'src/app/shared/model/cart.product.model';
import { User2Model } from 'src/app/shared/model/user2.model';
import { CartProduct1Model } from 'src/app/shared/model/CartProduct.model';
import { HttpClient } from '@angular/common/http';
import { OrderModel } from 'src/app/shared/model/Order.model';
import { OrderDetails1Model } from 'src/app/shared/model/orderDetails1.model';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  constructor(private cartService: CartService,private http:HttpClient) {}

  orderChanged=new Subject<OrderModel[]>();
  order:OrderModel[]=[
    {
      id:0,
      amount:0,
      orderDetails:[{
          id:0,
          product: {
              description: "",
              id: 0,
              image: "",
              name: "",
              price: 0,
              seller: {
                  accountNonExpired: false,
                  accountNonLocked: false,
                  authorities: [{}],
                  createdAt: "",
                  credentialsNonExpired: false,
                  email: "",
                  enabled: false,
                  firstName: "",
                  id: 0,
                  lastName: "",
                  password: "",
                  phone: "",
                  role: "",
                  username: ""
              },
              stock: 0
          },
          quantity:0
      }],
      orderedAt:'',
      payment:{
          amount: 0,
          id: 0,
          paidAt: "",
          paymentMethod: "",
          status: ""
      }
  }
  ];

  ordersChanged = new Subject<OrdersModel[]>();
  orderDetailsChanged = new Subject<OrderDetailsModel[]>();
  orders: OrdersModel[] = [];
  orderDetails: OrderDetails1Model[] = [];
  fetchOrders(){

    this.http.get<OrderModel[]>('http://localhost:8080/api/v1/order/customer/orderHistory').subscribe(
      (data)=>{
        this.order=data;
        console.log(data);
        this.orderChanged.next(data);
      }
    );

  }
  getOrders() {
    return this.order.slice();
  }
  getOrderDetails(i:number) {
    this.orderDetails=this.order[i].orderDetails;
    return this.orderDetails.slice();
  }
  addOrder(order: OrdersModel, products: CartProduct1Model) {
    this.orders.push(order);
    this.ordersChanged.next(this.orders.slice());
    let orderDetail: OrderDetailsModel = {
      products: [],
      totalPrice: order.totalPrice,
      deliveryDate: new Date(),
    };
    for (let product of products.cartDetails) {
      orderDetail.products.push({
        img: '',
        category: '',
        name: product.product.name,
        price: product.product.price,
        quantity: product.quantity,
      });
    }
    // this.orderDetails.push(orderDetail);
    // this.orderDetailsChanged.next(this.orderDetails.slice());

    this.cartService.emptyCart();
  }
}
