import { CartProductModel } from "./cart.product.model";
import { ProductModel } from "./product.model";

export class OrderDetailsModel{
    products: CartProductModel[]=[];
    totalPrice:number=0;
    deliveryDate: Date=new Date();
}