import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersModel } from 'src/app/shared/model/orders.model';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [OrdersService]
})
export class OrdersComponent implements OnInit{

  orders: OrdersModel[]=[];

  constructor(private router: Router, private route:ActivatedRoute, private ordersService:OrdersService){}

  

  ngOnInit(): void {
    this.orders=this.ordersService.getOrders();
  }

  changeShow(index:number){
    this.orders[index].show=!this.orders[index].show;
  }
  // orderDetails(i:number){
  //   this.router.navigate(['',i],{relativeTo:this.route});
  // }

}
