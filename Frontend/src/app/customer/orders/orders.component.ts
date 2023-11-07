import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersModel } from 'src/app/shared/model/orders.model';
import { OrdersService } from './orders.service';
import { UserService } from '../user.service';
import { ErrorHandlerService } from 'src/app/errorHandler.service';
import { OrderModel } from 'src/app/shared/model/Order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{

  orders: OrderModel[]=[];
  show:boolean[]=[];

  constructor(private router: Router, private route:ActivatedRoute, private ordersService:OrdersService,private userService:UserService,private error:ErrorHandlerService){}

  

  ngOnInit(): void {
    

    this.ordersService.fetchOrders();
    this.ordersService.orderChanged.subscribe(
      (order:OrderModel[])=>{
        this.orders=order;
        for(let i=0;i<this.orders.length;i++){
          this.show[i]=false;
        }
      }
    )
  }

  changeShow(index:number){
    this.show[index]=!this.show[index];
  }
  // orderDetails(i:number){
  //   this.router.navigate(['',i],{relativeTo:this.route});
  // }

}
