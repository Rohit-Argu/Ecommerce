import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CardModel } from '../model/card.model';
import { ProductService } from './product.service';
import { CartService } from 'src/app/customer/cart/cart.service';

import { OrdersService } from 'src/app/customer/orders/orders.service';
import { OrderDetailsModel } from '../model/order.details.model';
import { UserService } from 'src/app/customer/user.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit{

  cards:CardModel[]=[];
  cart=faShoppingCart;
  user='customer';

  constructor(private router:Router,private productService: ProductService,private route:ActivatedRoute,private ordersService:OrdersService, private cartService: CartService,private changeDetectorRef:ChangeDetectorRef,private userService:UserService){}
  ngOnInit(): void {
    this.productService.fetchCards();
    this.cards=this.productService.getCards();
    
    this.changeDetectorRef.detectChanges();
  }
  
  onLogin(){
    this.router.navigate(['login']);
  }
  getUser(){
    return this.user;
  }
  details(i:number){
    this.router.navigate(['/products',i]);
  }
  onSearchSubmit(s:any){
    this.productService.search(s.value);
    s.value="";
    s.focus();
  }

}
