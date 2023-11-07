import { OrderDetails1Model } from "./orderDetails1.model";
import { PaymentModel } from "./payment.model";

export interface OrderModel{
    id:number;
    amount:number;
    orderDetails:OrderDetails1Model[];
    orderedAt:string;
    payment:PaymentModel;
}