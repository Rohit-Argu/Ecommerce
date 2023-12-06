import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { UserService } from 'src/app/customer/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from '@angular/compiler';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit,OnDestroy{
  user!: SocialUser;
  loggedIn: boolean=false;
  authSubscription: any;

  
  constructor(private authService1:SocialAuthService,private router:Router, private authService:AuthService,private userService:UserService){}

  loginForm: FormGroup=new FormGroup({
    email: new FormControl(null,Validators.required),
        password: new FormControl(null,Validators.required)
  });
  
  ngOnInit(): void {
    this.loginForm=new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.email]),
        password: new FormControl(null,Validators.required)
    });
      this.authSubscription = this.authService1.authState.subscribe((user) => {
        if (user) {
          localStorage.setItem('loggedOut','true');
          if (localStorage.getItem('loggedOut') === 'true') {
            this.authService.googleSignIn(user.idToken).subscribe(
              (resData) => {
                localStorage.setItem('loggedOut', 'false');
                localStorage.setItem('token', resData.token);
                this.router.navigate(['products']);
              },
              (error) => {
                alert('Wrong credentials');
                this.router.navigate(['login']);
              }
            );
          }
          
          // Unsubscribe after the first emission to prevent multiple calls
          if (this.authSubscription) {
            this.authSubscription.unsubscribe();
          }
        }
      });
    
    

  }



  onSubmit(){
    this.authService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe(
      (resData)=>{
        
        localStorage.setItem('token',resData.token);


        this.router.navigate(['products']);
      },
      (error)=>{
        alert("Wrong credentials");
        this.router.navigate(['login']);
      });
  }
  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }


}


