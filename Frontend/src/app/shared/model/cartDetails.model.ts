import { Product1Model } from "./product1.model";

export interface CartDetailsModel{
    id:number;
    product:Product1Model;
    quantity:number;
}