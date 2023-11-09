import { Injectable } from '@angular/core';
import { CardModel } from '../model/card.model';
import { ProductModel } from '../model/product.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product1Model } from '../model/product1.model';
import { Observable } from 'rxjs';
import { ProductsResp } from '../model/ProductsResp.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  cards: CardModel[] = [
  ];
  products: ProductModel[] = [
  ];
  product:ProductModel={
    id:0,
    image:'',
    name:'',
    price:0,
    stock:0,
    description:''
  };

  getAllProducts(page: number, size: number, sortField: string, sortOrder: string, filterValue: string): Observable<ProductsResp> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortField', sortField)
      .set('sortOrder', sortOrder)
      .set('filterValue', filterValue);

    return this.http.get<ProductsResp>('http://localhost:8080/api/v1/product/viewAllProductsFiltered', { params });
  }

  fetchCards() {
    return this.http
      .get<Product1Model[]>(
        'http://localhost:8080/api/v1/product/viewAllProducts'
      )
      .subscribe((data) => {
        console.log(data.length);
        for(let i=0;i<data.length;i++){
          this.products.push({
            id: data[i].id,
            image: data[i].image,
            name: data[i].name,
            price: data[i].price,
            stock: data[i].stock,
            description: data[i].description
          });
          this.cards.push({
            id:data[i].id,
            image: data[i].image,
            name: data[i].name,
            description: data[i].description,
          });
        }
        
        console.log(this.products);
      });
  }
  getCards() {
    return this.cards;
  }
  getProducts(i: number) {
    return this.http
      .get<Product1Model>(
        'http://localhost:8080/api/v1/product/viewProduct/'+i
      )
  }
  search(text: string) {
    console.log(text);
  }
}
