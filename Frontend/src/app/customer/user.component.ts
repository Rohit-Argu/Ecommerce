import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';
import { UserModel } from '../shared/model/user.model';
import { User1Model } from '../shared/model/user1.model';
import { User2Model } from '../shared/model/user2.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userChanged=new Subject<User2Model>();
  user:User2Model= {
    email: '',
    firstName: '',
    lastName: '',
    role: '',
    createdAt:''
  };
  acnt_type = 'admin';
  option1 = 'cart';
  option2 = 'orders';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.getUser();
    this.userChanged.subscribe(
      (data)=>{
        if (data.role === 'seller') {
          this.option1 = 'addProduct';
          this.option2 = 'listedOrders';
        } else if (data.role === 'admin') {
          this.option1 = 'deleteUser';
          this.option2 = 'viewUsers';
        }
      }
    )
    
    
  }

  onCart() {
    console.log('trying cart');
    this.router.navigate(['/cart']);
  }
  getAcntType() {
    return this.user.role;
  }
  getUser() {

    this.user=this.userService.getUser() ;
    this.userService.userChanges.subscribe(
      (data)=>{
        this.user=data;
        if (data.role === 'seller') {
          this.option1 = 'addProduct';
          this.option2 = 'listedOrders';
        } else if (data.role === 'admin') {
          this.option1 = 'deleteUser';
          this.option2 = 'viewUsers';
        }
      }
    );
  }
  lowercase(s:string) {
    return s.toLowerCase();
  }
}
