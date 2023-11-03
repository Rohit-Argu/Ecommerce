import { User1Model } from "./user1.model";

export interface AddProductModel{
    name:string,
    image:string,
    description: string,
    price:number,
    stock:number
}