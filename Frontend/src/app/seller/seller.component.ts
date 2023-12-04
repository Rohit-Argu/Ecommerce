import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../shared/model/product.model';
import { SellerService } from './seller.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../customer/user.service';
import { ErrorHandlerService } from '../errorHandler.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit{
  products: ProductModel[]=[];
  constructor(private sellerService:SellerService,private router:Router,private userService:UserService,private error:ErrorHandlerService){}

  ngOnInit(): void {
   
    this.getProducts();
    this.sellerService.change.subscribe((data)=>{
      this.getProducts();
    })
  }
  getProducts(){
    this.sellerService.getProducts().subscribe(
      (data)=>{
        this.products=[];
        for(let i =0;i<data.length;i++){
          this.products.push({
            id:data[i].id,
            image:data[i].image,
            name:data[i].name,
            price:data[i].price,
            stock:data[i].stock,
            description:data[i].description
          });
        }
        console.log("Updating");
        
      }
    )
  }
  deleteItem(i:number){
    this.sellerService.deleteItem(this.products[i].id);
  }
  editItem(i:number){
    this.router.navigate(['editProduct/',this.products[i].id]);
  }

}
