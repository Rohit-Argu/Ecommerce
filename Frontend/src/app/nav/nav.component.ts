import { Component } from '@angular/core';
import { CartService } from '../customer/cart/cart.service';
import { UserService } from '../customer/user.service';
import { AuthService } from '../shared/login/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private cartService: CartService, private userService:UserService,private authService:AuthService){}
  
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
    return this.userService.getRole();
  }
}
