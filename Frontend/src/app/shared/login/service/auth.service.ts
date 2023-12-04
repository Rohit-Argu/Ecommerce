import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService{

    token:string="";
    constructor(private http:HttpClient,private router:Router){}

    isLoggedIn():boolean{
        if(localStorage.getItem('token'))
            return true;
        else
        return false;
    }
    login(email:string,password:string){
        const bodyData={
            email:email,
            password:password
        }
        return this.http.post<AuthResponse>('http://localhost:8080/api/v1/auth/signin',bodyData)
        
    }
    logout(){
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    }
    register(bodyData:any){
        return this.http.post<AuthResponse>('http://localhost:8080/api/v1/auth/signup',bodyData)
        
    }
    googleSignIn(idToken: any){
        return this.http.post<AuthResponse>('http://localhost:8080/api/v1/auth/google/signin',idToken)
    }
}
interface AuthResponse {
    token: string;
    // You can include other properties from your response if needed
  }
  