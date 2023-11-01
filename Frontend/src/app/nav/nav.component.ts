import { Component, OnInit } from '@angular/core';
import { CartService } from '../customer/cart/cart.service';
import { UserService } from '../customer/user.service';
import { AuthService } from '../shared/login/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  role="";
  constructor(private cartService: CartService, private userService:UserService,private authService:AuthService){}
  
  ngOnInit(){
    this.userService.getUser();
    this.getRole();
  }

  getCartCount(){
    return this.cartService.getTotalQuantity();
  }

  getUser(){
    return 'customer';
  }
  getFirstName(){
    // return this.userService.getFirstName();
    return null;
  }
  onLogout(){
    this.authService.logout();
  }
  getRole(){
    this.role=this.userService.getRole();
    this.userService.userChanges.subscribe(
      (user)=>{
        this.role=user.role.toLowerCase();
        console.log(this.role);
      }
    )
    console.log(this.role);
  }
}
