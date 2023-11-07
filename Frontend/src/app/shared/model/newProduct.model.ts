import { User1Model } from './user1.model';

export interface Product2Model {
  description: string;
  id: number;
  image: File;
  name: string;
  price: number;
  seller: User1Model;
  stock: number;
}
