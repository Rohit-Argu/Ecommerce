import { Component, OnInit } from '@angular/core';
import { AddressModel } from 'src/app/shared/model/address.model';
import { UserService } from '../../user.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css'],
})
export class EditAddressComponent implements OnInit{
  addressForm=new FormGroup({
    'houseNo': new FormControl(0,Validators.required),
    'locality':new FormControl('',Validators.required),
    'district':new FormControl('',Validators.required),
    'state':new FormControl('',Validators.required),
    'country':new FormControl('',Validators.required),
    'pincode':new FormControl(0,Validators.required),
  })

  id:number=0;
  a1={
    houseNo:0,
    locality:'',
    district:'',
    state:'',
    country:'',
    pincode:0
  };
  
  


  constructor(private userService:UserService,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    console.log(this.id);
    this.userService.fetchAddress(this.id);
    this.userService.addressChanged.subscribe(
      (data)=>{
        this.id=data.id;
        this.addressForm.setValue({
          'houseNo':data.houseNo,
          'locality':data.locality,
          'district':data.district,
          'state':data.state,
          'country':data.country,
          'pincode':data.pincode
        })
      }
    );
  }
  onSubmit(){
    this.a1.houseNo=this.addressForm.value.houseNo||0;
    this.a1.locality=this.addressForm.value.locality||'';
    this.a1.district=this.addressForm.value.district||'';
    this.a1.state=this.addressForm.value.state||'';
    this.a1.country=this.addressForm.value.country||'';
    this.a1.pincode=this.addressForm.value.pincode||0;
    this.userService.editAddress(this.a1,this.id);
  }
}
