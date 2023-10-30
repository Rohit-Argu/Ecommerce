import { Injectable } from "@angular/core";
import { UserModel } from "../shared/model/user.model";
import { Subject } from "rxjs";

@Injectable({providedIn:'root'})
export class UserService{

    usersChange=new Subject<UserModel[]>();
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
    },
    {
        firstName: 'Diganta',
        lastName: 'Banik',
        role: 'admin',
        phoneNo: '6491537854'
    }]

    getUsers(){
        return this.users.slice();
    }
    getUser(){
        return this.users[0].firstName;
    }
    deleteUser(i:number){
        this.users.splice(i,1);
        this.usersChange.next(this.users.slice());
    }
}