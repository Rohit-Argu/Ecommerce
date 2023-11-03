import { Injectable, OnInit } from "@angular/core";
import { UserService } from "../customer/user.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product1Model } from "../shared/model/product1.model";
import { AddProductModel } from "../shared/model/addProduct.model";
import { User1Model } from "../shared/model/user1.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class SellerService implements OnInit {
    
  seller: User1Model = {
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
    username: '',
  };

  id: number = 0;

  constructor(private userService: UserService, private http: HttpClient,private router:Router) {}

  ngOnInit(): void {
    this.userService.getUser();
    this.getId();
  }
  getId() {
    this.id = this.userService.getId();
    this.userService.userChanges.subscribe((user) => {
      this.id = this.userService.getId();
      console.log(this.id);
    });
  }
  getProducts() {
    return this.http.get<Product1Model[]>(
      'http://localhost:8080/api/v1/product/viewProducts'
    );
  }
  deleteItem(i: number) {
    const headers=new HttpHeaders().set('Content-Type','text/plain; charset=utf-8');
    this.http.delete(
      'http://localhost:8080/api/v1/product/seller/deleteProduct/'+i,{
        headers,responseType:'text'
      }
    ).subscribe((data)=>{
        console.log(data);
    });
  }
  addItem(p: AddProductModel) {
    const bodyData = {
      description: p.description,
      image: p.image,
      name: p.name,
      price: p.price,
      stock: p.stock,
    };
    console.log(bodyData);
    this.http
      .post('http://localhost:8080/api/v1/product/seller/addProduct', bodyData)
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(['/listedProducts']);
      });
  }
  editItem(p:AddProductModel,id:number){
    const bodyData = {
        description: p.description,
        image: p.image,
        name: p.name,
        price: p.price,
        stock: p.stock,
      };
    this.http.put('http://localhost:8080/api/v1/product/seller/updateProduct/'+id,bodyData).subscribe(
        (data)=>{
            console.log(data);
            this.router.navigate(['/listedProducts']);
        }
    )
  }
}