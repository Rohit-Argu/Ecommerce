import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { UserService } from 'src/app/customer/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  
  constructor(private router:Router, private authService:AuthService,private userService:UserService){}

  loginForm: FormGroup=new FormGroup({
    email: new FormControl(null,Validators.required),
        password: new FormControl(null,Validators.required)
  });
  
  ngOnInit(): void {
    this.loginForm=new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.email]),
        password: new FormControl(null,Validators.required)
    });
  }



  onSubmit(){
    this.authService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe(
      (resData)=>{
        
        localStorage.setItem('token',resData.token);
        this.userService.getUser();
        
        this.router.navigate(['products']);
      },
      (error)=>{
        alert("Wrong credentials");
        this.router.navigate(['login']);
      })
    
    ;
    
  }

}


