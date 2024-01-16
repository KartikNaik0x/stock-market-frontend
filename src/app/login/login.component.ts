import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  token:any;
  role:string="";
  constructor(
    private userService : UserService,
    private userAuthService : UserAuthService,
    private router :Router
  ) { }

  ngOnInit(): void {
  }

  login(loginForm :NgForm){
    console.log("called login")
    this.userService.login(loginForm.value).subscribe(
      (response:any)=>{
        this.token=response;
        console.log(response);
        this.userAuthService.setToken(response.token);
        this.userAuthService.setRole(response.role);
        this.role=this.userAuthService.getRole();
        if(this.role == "admin"){
          this.router.navigate(["/admin"]);
        }
        else{
          this.router.navigate(["/user"]);
        }
        
      },
      (error)=>{
        alert("Please register user")
        console.log(error);
      }
    );
    loginForm.resetForm();

  }

  // getrole(){
  //   console.log("called getrole")

  //   this.userService.getRole().subscribe(response =>{
  //     this.role=response;
  //     console.log(this.role);
  // });
  // }

  // wrapfunction(loginForm:NgForm){
  //   this.login(loginForm);
  //   this.getrole();

  // }

}




