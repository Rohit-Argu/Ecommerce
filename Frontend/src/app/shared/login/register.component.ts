import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { UserService } from 'src/app/customer/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor(private router:Router,private authService:AuthService,private userService:UserService){}

  registerForm:FormGroup=new FormGroup({
    email:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required),
    firstname:new FormControl(null,Validators.required),
    lastname:new FormControl(null,Validators.required),
    role:new FormControl(null,Validators.required)
  });
  ngOnInit(): void {
    this.registerForm=new FormGroup({
      email:new FormControl(null,Validators.required),
      password:new FormControl(null,Validators.required),
      firstname:new FormControl(null,Validators.required),
      lastname:new FormControl(null,Validators.required),
      role:new FormControl('customer',Validators.required)
    });
  }


  addUser(){
    console.log(this.registerForm);
    const data={
      email:this.registerForm.value.email,
      password:this.registerForm.value.password,
      firstName:this.registerForm.value.firstname,
      lastName:this.registerForm.value.lastname,
      role:uppercase(this.registerForm.value.role)
    }
    this.authService.register(data).subscribe(
      (resData)=>{
        localStorage.setItem('token',resData.token);
        this.userService.getUser();
        this.router.navigate(['products']);
      }
    );
  }

}
function uppercase(s: string) {
  return s.toUpperCase();
}

