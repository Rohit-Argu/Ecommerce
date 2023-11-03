import { CartDetailsModel } from "./cartDetails.model";

export interface CartProduct1Model{
    id:number;
    cartDetails:CartDetailsModel[],
    amount:number;
}