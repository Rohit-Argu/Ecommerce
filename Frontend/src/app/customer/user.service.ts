import { Injectable, OnInit } from '@angular/core';
import { UserModel } from '../shared/model/user.model';
import { Observable, Subject, first } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User1Model } from '../shared/model/user1.model';
import { User2Model } from '../shared/model/user2.model';
import { UsersResp } from '../admin/UsersResp';
import { Router } from '@angular/router';
import { AddressModel } from '../shared/model/address.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  addressChanged=new Subject<AddressModel>();
  addressesChanged = new Subject<AddressModel[]>();

  address:AddressModel={
      country: '',
      district: '',
      houseNo: 0,
      id: 0,
      locality: '',
      order: [],
      pincode: 0,
      state: '',
      user: {
          accountNonExpired: false,
          accountNonLocked: false,
          authorities: [{}],
          createdAt: '',
          credentialsNonExpired: false,
          email: '',
          enabled: false,
          firstName: '',
          id: 0,
          lastName: '',
          password: '',
          phone: '',
          role: '',
          username: ''
      }
    };
  
  addresses: AddressModel[] = [
    {
      country: '',
      district: '',
      houseNo: 0,
      id: 0,
      locality: '',
      order: [],
      pincode: 0,
      state: '',
      user: {
        accountNonExpired: false,
        accountNonLocked: false,
        authorities: [{}],
        createdAt: '',
        credentialsNonExpired: false,
        email: '',
        enabled: false,
        firstName: '',
        id: 0,
        lastName: '',
        password: '',
        phone: '',
        role: '',
        username: '',
      },
    },
  ];
  userChanges = new Subject<User2Model>();
  id: number = 0;
  user: User2Model = {
    email: '',
    firstName: '',
    lastName: '',
    role: '',
    createdAt: '',
    phone: '',
  };
  constructor(private http: HttpClient, private router: Router) {}

  usersChange = new Subject<UserModel[]>();
  users: UserModel[] = [
    {
      firstName: '',
      lastName: '',
      role: '',
      phoneNo: '',
    },
  ];

  deleteUser(i: number) {
    this.users.splice(i, 1);
    this.usersChange.next(this.users.slice());
  }

  getRole() {
    return this.user.role;
  }

  getId() {
    return this.id;
  }

  getUser() {
    this.http
      .get<User1Model>('http://localhost:8080/api/v1/user/getUser')
      .subscribe((data) => {
        this.id = data.id;
        this.user = {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: this.lowercase(data.role),
          createdAt: data.createdAt.substring(0, 10),
          phone: data.phone,
        };
        this.userChanges.next(this.user);
      });
    return this.user;
  }
  lowercase(s: string) {
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

    return this.http.get<UsersResp>(
      'http://localhost:8080/api/v1/user/admin/getUsers',
      { params }
    );
  }

  editUser(u: User2Model) {
    this.http
      .put('http://localhost:8080/api/v1/user/updateUser', u)
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(['/user']);
      });
  }
  fetchAddresses() {
    this.http
      .get<AddressModel[]>(
        'http://localhost:8080/api/v1/user/customer/allAddress'
      )
      .subscribe((data) => {
        console.log(data[0].country);
        this.addresses = data;
        this.addressesChanged.next(this.addresses.slice());
      });
  }
  fetchAddress(id:number){
    this.http.get<AddressModel>('http://localhost:8080/api/v1/user/customer/address/'+id).subscribe(
        (data)=>{
            this.address=data;
            console.log(data);
            this.addressChanged.next(this.address);
        }
    );
  }
  getAddress(){
    return this.address;
  }
  getAddresses() {
    return this.addresses;
  }
  deleteAddress(i: number) {
    const headers = new HttpHeaders().set(
      'Content-Type','text/plain; charset=utf-8'
    );
    this.http
      .delete('http://localhost:8080/api/v1/user/customer/deleteAddress/' + i, {
        headers,responseType: 'text',
      })
      .subscribe((data) => {
        console.log(data);
      });
  }
  editAddress(a:any,id:number){
    this.http.put('http://localhost:8080/api/v1/user/customer/updateAddress/'+id,a).subscribe(
        (data)=>{
            console.log(data);
        }
    )
  }
  addAddress(a:any){
    this.http.post('http://localhost:8080/api/v1/user/address/addAddress',a).subscribe(
      (data)=>{
        console.log(data);
      }
    )
  }
}
