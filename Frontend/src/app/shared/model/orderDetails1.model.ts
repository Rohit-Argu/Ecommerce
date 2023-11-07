import { Product1Model } from "./product1.model";

export interface OrderDetails1Model{
    id:number;
    product: Product1Model;
    quantity:number;
}