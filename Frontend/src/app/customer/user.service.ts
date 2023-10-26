import { Injectable } from "@angular/core";
import { UserModel } from "../shared/model/user.model";

@Injectable({providedIn:'root'})
export class UserService{

    users:UserModel[]=[{
        firstName: 'Nirabhra',
        lastName: 'Chatterjee',
        role:'admin',
        phoneNo: '9330137822'
    },
    {
        firstName: 'Rohit',
        lastName: 'Aggarwal',
        role: 'seller',
        phoneNo: '9764359845'
    },
    {
        firstName: 'Kaushik',
        lastName: 'Soni',
        role: 'customer',
        phoneNo: '8461357823'
    }]

    getUsers(){
        return this.users.slice();
    }
}