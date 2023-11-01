import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  acnt_type="admin";
  option1="cart";
  option2="orders";

  constructor(private router: Router,private route: ActivatedRoute,private userService:UserService){}
  ngOnInit(): void {
    if(this.acnt_type==='seller'){
      this.option1="addProduct";
      this.option2="listedOrders";
    }
    else if(this.acnt_type==='admin'){
      this.option1="deleteUser";
      this.option2="viewUsers";
    }
    this.getUser();
  }



  onCart(){
    console.log('trying cart');
    this.router.navigate(['/cart']);

  }
  getAcntType(){
    return this.acnt_type;
  }
  getUser(){
    this.userService.getUser().subscribe(
      (user)=>{
        console.log(user);
      }
    );
    
  }
}
