import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private router:Router){}

  loginForm: FormGroup=new FormGroup({
    username: new FormControl(null,Validators.required),
        password: new FormControl(null,Validators.required)
  });
  
  ngOnInit(): void {
    this.loginForm=new FormGroup({
      username: new FormControl(null,Validators.required),
        password: new FormControl(null,Validators.required)
    });
  }

  onSubmit(){
    console.log(this.loginForm);
    this.router.navigate(['products']);
  }

}
