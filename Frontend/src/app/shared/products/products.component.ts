import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CardModel } from '../model/card.model';
import { ProductService } from './product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit{

  cards:CardModel[]=[];
  cart=faShoppingCart;
  user='customer';

  constructor(private router:Router,private productService: ProductService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.cards=this.productService.getCards();
  }
  onLogin(){
    this.router.navigate(['login']);
  }
  getUser(){
    return this.user;
  }
  details(i:number){
    this.router.navigate(['/products',i]);
  }

}
