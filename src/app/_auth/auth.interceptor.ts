import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable, throwError } from "rxjs";
import {catchError} from "rxjs/operators"
import { UserAuthService } from "../_services/user-auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
   
    constructor(private userAuthService:UserAuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.headers.get("No-Auth") === "True"){
            console.log(req.headers.get("No-Auth"));
            return next.handle(req.clone());
        }

        const token=this.userAuthService.getToken();
        req=this.addToken(req,token);
        return next.handle(req).pipe(
            catchError(
                (err: HttpErrorResponse) =>{
                    console.log(err.status);
                    console.log(err)
                  //  alert("something went wrong")
                    return throwError(err);
                }
            )
        );
    }

    private addToken(request:HttpRequest<any>,token:string){
        return request.clone(
            {
                setHeaders:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
    }
    
}