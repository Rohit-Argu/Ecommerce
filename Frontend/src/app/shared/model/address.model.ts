import { OrderModel } from './Order.model';
import { User1Model } from './user1.model';

export interface AddressModel {
  country: string;
  district: string;
  houseNo: number;
  id: number;
  locality: string;
  order: OrderModel[];
  pincode: number;
  state: string;
  user: User1Model;
}
