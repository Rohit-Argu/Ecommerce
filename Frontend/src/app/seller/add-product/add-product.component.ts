import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SellerComponent } from '../seller.component';
import { SellerService } from '../seller.service';
import { AddProductModel } from 'src/app/shared/model/addProduct.model';
import { UserService } from 'src/app/customer/user.service';
import { ErrorHandlerService } from 'src/app/errorHandler.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{

  constructor(private sellerService:SellerService,private userService:UserService,private error:ErrorHandlerService){}

  productForm=new FormGroup({
    'name':new FormControl<string>('',Validators.required),
    'image':new FormControl('',Validators.required),
    'description':new FormControl<string>('',Validators.required),
    'price':new FormControl<number>(0,Validators.required),
    'stock':new FormControl<number>(0,Validators.required)
  });

  addProduct:AddProductModel={
    name: '',
    image: '',
    description: '',
    price: 0,
    stock: 0
  };

  ngOnInit(): void {
    if(this.userService.getRole()!=='seller'){
      this.error.handle('Cannot access this!')
    }
    this.productForm=new FormGroup({
      'name':new FormControl<string>('',Validators.required),
      'image':new FormControl('',Validators.required),
      'description':new FormControl<string>('',Validators.required),
      'price':new FormControl<number>(0,Validators.required),
      'stock':new FormControl<number>(0,Validators.required)
    });
    this.productForm.setValue({
      'name':'',
      'image': '',
      'description':'',
      'price':0,
      'stock':0
    })
  }

  onSubmit(){
    console.log(this.productForm.value.name);
    this.addProduct = {
      name: this.productForm.value.name||'',
      image: this.productForm.value.image||'',
      description: this.productForm.value.description||'',
      price: this.productForm.value.price||0,
      stock: this.productForm.value.stock||0
    };
    this.sellerService.addItem(this.addProduct);
  }

}
