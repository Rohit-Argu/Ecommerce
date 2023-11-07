import { Component, Input, OnInit } from '@angular/core';
import { OrderDetailsModel } from 'src/app/shared/model/order.details.model';
import { OrdersModel } from 'src/app/shared/model/orders.model';
import { OrdersService } from '../orders.service';
import { UserService } from '../../user.service';
import { ErrorHandlerService } from 'src/app/errorHandler.service';
import { OrderModel } from 'src/app/shared/model/Order.model';
import { OrderDetails1Model } from 'src/app/shared/model/orderDetails1.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{
  @Input()
  index!: number;

  orderDetails: OrderDetails1Model[]=[];
  orders:OrderModel[]=[];

  constructor(private ordersService: OrdersService,private userService:UserService,private error:ErrorHandlerService){}

  ngOnInit(): void {
    if(this.userService.getRole()!=='customer'){
      this.error.handle('Cannot access this!')
    }
    this.orders=this.ordersService.getOrders();
    this.orderDetails=this.ordersService.getOrderDetails(this.index);
    console.log(this.orderDetails);
    // this.ordersService.orderDetailsChanged.subscribe(
    //   (orderdetail: OrderDetails1Model[])=>{
    //     this.orderDetails=orderdetail;
    //     console.log(this.orderDetails);
    //   }
    // )
  }


}
