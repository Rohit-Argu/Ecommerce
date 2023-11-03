import { Injectable, OnInit } from "@angular/core";
import { UserModel } from "../shared/model/user.model";
import { Observable, Subject, first } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient, HttpParams } from "@angular/common/http";
import { User1Model } from "../shared/model/user1.model";
import { User2Model } from "../shared/model/user2.model";
import { UsersResp } from "../admin/UsersResp";
import { Router } from "@angular/router";

@Injectable({providedIn:'root'})
export class UserService{

    userChanges=new Subject<User2Model>();
    id:number=0;
    user:User2Model= {
        email: '',
        firstName: '',
        lastName: '',
        role: '',
        createdAt:'',
        phone:''
      };
    constructor(private http:HttpClient,private router:Router){}

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

    deleteUser(i:number){
        this.users.splice(i,1);
        this.usersChange.next(this.users.slice());
    }

    getRole(){
        return this.user.role;
    }

    getId() {
        return this.id;
    }

    getUser(){
        this.http.get<User1Model>('http://localhost:8080/api/v1/user/getUser').subscribe(
            (data)=>{
                this.id=data.id
                this.user = {
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    role: this.lowercase(data.role),
                    createdAt:data.createdAt.substring(0,10),
                    phone:data.phone
                  };
                  this.userChanges.next(this.user);
            }
        );
        return this.user;
    }
    lowercase(s:string) {
        return s.toLowerCase();
      }

      getUsers(
        page: number,
        size: number,
        sortField: string,
        sortOrder: string,
        // filterField: string,
        filterValue: string
      ): Observable<UsersResp> {
        const params = new HttpParams()
          .set('page', page.toString())
          .set('size', size.toString())
          .set('sortField', sortField)
          .set('sortOrder', sortOrder)
        //   .set('filterField', filterField)
          .set('filterValue', filterValue);
    
        return this.http.get<UsersResp>('http://localhost:8080/api/v1/user/admin/getUsers', { params });
      }

      editUser(u:User2Model){
        this.http.put('http://localhost:8080/api/v1/user/updateUser',u).subscribe(
            (data)=>{
                console.log(data);
                this.router.navigate(['/user'])
            }
        )
    }
}