import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AddressModel } from 'src/app/shared/model/address.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved-addresses',
  templateUrl: './saved-addresses.component.html',
  styleUrls: ['./saved-addresses.component.css']
})
export class SavedAddressesComponent implements OnInit{

  addresses:AddressModel[]=[{
    country: '',
    district: '',
    houseNo: 0,
    id: 0,
    locality: '',
    order: [],
    pincode: 0,
    state: '',
    user: {
      accountNonExpired: false,
      accountNonLocked: false,
      authorities: [{}],
      createdAt: '',
      credentialsNonExpired: false,
      email: '',
      enabled: false,
      firstName: '',
      id: 0,
      lastName: '',
      password: '',
      phone: '',
      role: '',
      username: ''
    }
  }];
  show:boolean[]=[];

  constructor(private userService:UserService, private router:Router){}

  ngOnInit(): void {
    this.userService.fetchAddresses();
    this.userService.addressesChanged.subscribe(
      (data)=>{
        this.addresses=data;
        for(let i=0;i<this.addresses.length;i++){
          this.show[i]=false;
        }
      }
    );
  }
  changeShow(i:number){
    this.show[i]=!this.show[i];
  }
  editItem(i:number){
    this.router.navigate(['/editAddress',i]);
  }
  deleteItem(i:number){
    this.userService.deleteAddress(i);
  }
  onAdd(){
    this.router.navigate(['/editAddress',0])
  }

}
