import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SellerService } from 'src/app/seller/seller.service';
import { AddProductModel } from 'src/app/shared/model/addProduct.model';
import { Product1Model } from 'src/app/shared/model/product1.model';
import { User2Model } from 'src/app/shared/model/user2.model';
import { UserService } from '../user.service';
import { UserModel } from 'src/app/shared/model/user.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  user:User2Model= {
    email: '',
    firstName: '',
    lastName: '',
    role: '',
    createdAt:'',
    phone:''
  };

  userForm=new FormGroup({
    'firstName':new FormControl<string>('',Validators.required),
    'lastName':new FormControl('',Validators.required),
    'phoneNo':new FormControl<string>('',Validators.required)
  });

  id:number=0;
  constructor(private http:HttpClient,private route:ActivatedRoute,private sellerService:SellerService,private userService:UserService){}

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    console.log(this.id);
    this.getUser();
    
  }
  getUser() {

    this.user=this.userService.getUser() ;
    this.userService.userChanges.subscribe(
      (data)=>{
        this.user=data;
        this.userForm.setValue({
          'firstName':this.user.firstName,
          'lastName':this.user.lastName,
          'phoneNo':this.user.phone
        });
      }
    );
  }

  onSubmit(){
    this.user={
      email: this.user.email,
      firstName: this.userForm.value.firstName||'',
      lastName: this.userForm.value.lastName||'',
      role: this.user.role.toUpperCase(),
      createdAt:'',
      phone:this.userForm.value.phoneNo||''
    }
    this.userService.editUser(this.user);
  }

  
}
