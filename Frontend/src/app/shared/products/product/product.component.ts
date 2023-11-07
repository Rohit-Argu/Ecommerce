import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { ProductModel } from '../../model/product.model';
import { Location } from '@angular/common';
import { CartService } from 'src/app/customer/cart/cart.service';
import { UserService } from 'src/app/customer/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id:number=0;
  role:string='';
  quantity:number=1
  product:ProductModel={
    id:0,
    img:"",
    name:"",
    price:0,
    stock:0,
    description:""
};
  constructor(private router:Router,private route:ActivatedRoute,private productService:ProductService, private location:Location,private cartService:CartService,private userService:UserService){}
  ngOnInit(): void {
    this.getRole();
    this.id=this.route.snapshot.params['id'];
    this.productService.getProducts(this.id).subscribe((data)=>{
      this.product={
        id: data.id,
          img: data.image,
          name: data.name,
          price: data.price,
          stock: data.stock,
          description: data.description
      }
    });
  }
  getRole(){
    this.role=this.userService.getRole();
  }

  goBack(){
    this.location.back();
  }
  incQuantity(){
    if(this.quantity<5)
    this.quantity++;
  }
  decQuantity(){
    if(this.quantity>1)
    this.quantity--;
  }
  addToCart(){
    console.log("adding to cart");
    this.cartService.addToCart(this.product.id,this.quantity);
    this.router.navigate(['cart']);
  }

}
