import { Component, OnInit } from '@angular/core';
import { UserModel } from '../shared/model/user.model';
import { UserService } from '../customer/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  users:UserModel[]=[];

  constructor(private userService:UserService){}

  ngOnInit(): void {
    this.users=this.userService.getUsers();
    console.log(this.users);
  }

}
