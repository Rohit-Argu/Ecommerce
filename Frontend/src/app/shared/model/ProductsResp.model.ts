import { ProductModel } from "./product.model";

export interface ProductsResp {
    content: ProductModel[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    lastPage: boolean;
  }
  