import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setToken(jwtToken:string){
    localStorage.setItem("jwtToken",jwtToken);
  }
  public getToken(): any{
    return localStorage.getItem("jwtToken");
  }

  public setRole(role:string){
    localStorage.setItem("role",role)
  }

  public getRole():any{
    return localStorage.getItem("role");
  }


  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(){
    return this.getToken()  && 1;
  }
}
