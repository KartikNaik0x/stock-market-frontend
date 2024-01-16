import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }
   er:any;
   st:string="";
 
  public register(registerForm:NgForm){
      console.log(registerForm.value);
      this.userService.register(registerForm.value).subscribe(
        (response)=>{
          console.log(response)
          alert("registration successful")
          registerForm.resetForm();
          this.router.navigate(['/login'])
        },
        (error)=>{
          this.er=error;
          this.st="REGISTRATION UNSUCCESSFUL"+JSON.stringify(this.er.error);
          alert(this.st)
         
          
          console.log(JSON.stringify(this.er.error));
          console.log(this.er.error);
        }
      );
     
  }
}
