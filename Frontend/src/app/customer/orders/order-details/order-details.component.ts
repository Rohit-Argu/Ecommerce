import { Component, Input, OnInit } from '@angular/core';
import { OrderDetailsModel } from 'src/app/shared/model/order.details.model';
import { OrdersModel } from 'src/app/shared/model/orders.model';
import { OrdersService } from '../orders.service';
import { UserService } from '../../user.service';
import { ErrorHandlerService } from 'src/app/errorHandler.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{
  @Input()
  index!: number;

  orderDetails: OrderDetailsModel[]=[];
  orders:OrdersModel[]=[];

  constructor(private ordersService: OrdersService,private userService:UserService,private error:ErrorHandlerService){}

  ngOnInit(): void {
    if(this.userService.getRole()!=='customer'){
      this.error.handle('Cannot access this!')
    }
    this.orders=this.ordersService.getOrders();
    this.orderDetails=this.ordersService.getOrderDetails();
    this.ordersService.orderDetailsChanged.subscribe(
      (orderdetail: OrderDetailsModel[])=>{
        this.orderDetails=orderdetail;
        console.log(this.orderDetails);
      }
    )
  }


}
