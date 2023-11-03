import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersModel } from 'src/app/shared/model/orders.model';
import { OrdersService } from './orders.service';
import { UserService } from '../user.service';
import { ErrorHandlerService } from 'src/app/errorHandler.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{

  orders: OrdersModel[]=[];

  constructor(private router: Router, private route:ActivatedRoute, private ordersService:OrdersService,private userService:UserService,private error:ErrorHandlerService){}

  

  ngOnInit(): void {
    if(this.userService.getRole()!=='customer'){
      this.error.handle('Cannot access this!')
    }
    this.orders=this.ordersService.getOrders();
    this.ordersService.ordersChanged.subscribe(
      (order:OrdersModel[])=>{
        this.orders=order;
      }
    )
  }

  changeShow(index:number){
    this.orders[index].show=!this.orders[index].show;
  }
  // orderDetails(i:number){
  //   this.router.navigate(['',i],{relativeTo:this.route});
  // }

}
