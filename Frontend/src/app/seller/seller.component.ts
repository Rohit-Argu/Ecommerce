import { Component } from '@angular/core';
import { ProductModel } from '../shared/model/product.model';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {
  products: ProductModel[]=[];

}
