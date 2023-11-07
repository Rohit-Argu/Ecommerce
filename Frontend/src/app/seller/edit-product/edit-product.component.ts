import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddProductModel } from 'src/app/shared/model/addProduct.model';
import { Product1Model } from 'src/app/shared/model/product1.model';
import { SellerComponent } from '../seller.component';
import { SellerService } from '../seller.service';
import { ErrorHandlerService } from 'src/app/errorHandler.service';
import { UserService } from 'src/app/customer/user.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{

  productForm=new FormGroup({
    'name':new FormControl<string>('',Validators.required),
    'description':new FormControl<string>('',Validators.required),
    'price':new FormControl<number>(0,Validators.required),
    'stock':new FormControl<number>(0,Validators.required)
  });

  id:number=0;
  addProduct:any;
  constructor(private http:HttpClient,private route:ActivatedRoute,private sellerService:SellerService,private userService:UserService,private error:ErrorHandlerService){}

  ngOnInit(): void {
    
    this.id=this.route.snapshot.params['id'];
    this.http.get<Product1Model>('http://localhost:8080/api/v1/product/viewProduct/'+this.id).subscribe(
      (data)=>{
        this.productForm.setValue({
          'name':data.name,
          'description':data.description,
          'price':data.price,
          'stock':data.stock
        });
      }
    )
  }

  onSubmit(){
    this.addProduct = {
      name: this.productForm.value.name||'',
      description: this.productForm.value.description||'',
      price: this.productForm.value.price||0,
      stock: this.productForm.value.stock||0
    };
    this.sellerService.editItem(this.addProduct,this.id);
  }

}
