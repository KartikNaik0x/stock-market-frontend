import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API="http://localhost:8080/auth/v1.0/";
  POL_API="http://localhost:8081/v1.0/market/company/";
  PRICE_API="http://localhost:8081/v1.0/market/stock/add/";
  COM_URL="http://localhost:8081/v1.0/market/company/getAll"
  

  requestHeader=new HttpHeaders(
    {"No-Auth":"True"}
  );
  
  requestHeaderm=new HttpHeaders(
    {"No-Auth":"False"}
  );
  
  
  constructor(private httpClient: HttpClient) { }

  public login(loginData : any){
     

      return this.httpClient.post(this.PATH_OF_API+"login",loginData,{headers:this.requestHeader})
  }

  public register(registerData:any){
     return this.httpClient.post(this.PATH_OF_API+"add/user",registerData,{headers:this.requestHeader})

  }

 

 


  public getAllCompanyData(){
    return this.httpClient.get<any>(this.COM_URL);
  }

  public addCompanyPrice(companyCode: number, latestPrice: number){
    const apiUrl = `http://localhost:8081/v1.0/market/stock/add/${companyCode}`;
    return this.httpClient.post(apiUrl, { price: latestPrice })
  }

  public addCompany(formData:any){
    return this.httpClient.post(this.POL_API+"register",formData)

 }
 
  public getRole(){
     return this.httpClient.post(this.PATH_OF_API+"/getrole",{headers:this.requestHeaderm});
  }

}
