import { UserModel } from "../shared/model/user.model";
import { User1Model } from "../shared/model/user1.model";

export interface UsersResp {
    content: User1Model[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    lastPage: boolean;
  }
  