import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-addcompany',
  templateUrl: './addcompany.component.html',
  styleUrls: ['./addcompany.component.css']
})
export class AddcompanyComponent implements OnInit {


  currentDate:any=new Date();
  constructor(private userService:UserService,private router:Router) { }

  er:any;
  st:String="";
  

  ngOnInit(): void {
  }

  addpol(addpolicyForm:NgForm){
      console.log(addpolicyForm.value)
      this.userService.addCompany(addpolicyForm.value).subscribe(
        (response) =>{
        console.log(response);
        alert("registration successful");
      },
      (error)=>{
        console.log(error)
        this.er=error;
        this.st="REGISTRATION UNSUCCESSFUL"+JSON.stringify(this.er.error);
        alert(this.st)
      }
      )
  }
}
