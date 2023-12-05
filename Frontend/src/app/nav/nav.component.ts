import { Component, OnInit } from '@angular/core';
import { CartService } from '../customer/cart/cart.service';
import { UserService } from '../customer/user.service';
import { AuthService } from '../shared/login/service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  quantity: number = 0;
  role = '';
  firstName:string='';
  constructor(
    private authService1: SocialAuthService,
    private cartService: CartService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    
    this.userService.getUser();
    this.getRole();
    this.cartService.itemChanges.subscribe((data) => {
      this.quantity = 0;
      for (let cd of data.cartDetails) this.quantity += cd.quantity;
    });
  }
  getFirstName(){

    this.firstName=this.userService.getFirstName();
    return this.firstName;
  }

  getCartCount() {
    return this.quantity;
  }

  getUser() {
    return 'customer';
  }
  // getFirstName() {
  //   // return this.userService.getFirstName();
  //   this.userService.userChanges.subscribe(
  //     (data)=>{
  //       this.firstName=data.firstName;
  //       console.log(this.firstName);
  //     }
  //   )
  //   return this.firstName;
  // }
  onLogout() {
    localStorage.setItem('loggedOut','true');
    this.authService1.signOut();
    this.authService.logout();
  }
  getRole() {
    this.userService.userChanges.subscribe((user) => {
      this.role = user.role.toLowerCase();
      console.log(this.role);

      if (this.role === 'customer') {
        this.cartService.fetCart1();
      }
    });
    console.log(this.role);
  }
}
