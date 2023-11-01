import { User1Model } from './user1.model';

export interface Product1Model {
  description: string;
  id: number;
  image: string;
  name: string;
  price: number;
  seller: User1Model;
  stock: number;
}
