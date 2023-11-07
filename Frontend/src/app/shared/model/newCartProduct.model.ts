import { newCartDetailsModel } from "./newCartDetails.model";

export interface CartProduct2Model{
    id:number;
    cartDetails:newCartDetailsModel[],
    amount:number;
}