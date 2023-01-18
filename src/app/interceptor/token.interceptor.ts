import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // const token = localStorage.getItem('token');
    // if(token){
    //   request = request.clone({
    //     setHeaders : {Authoriztion:`Bearer ${token}`}
    //   })
    // }
    // return next.handle(request).pipe(
    //   catchError((err:any)=>{
    //     if(err instanceof HttpErrorResponse){
    //       if(err.status ==401){
    //         console.log("Unauthorized");
    //       }
    //     }
    //     return throwError(()=> new Error("Some"));
    //   })
    // );

    if (localStorage.getItem('token') != null) {
      const clonedReq = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      });
      //console.log(clonedReq);
      return next.handle(clonedReq).pipe(
          tap({
              next :(res:any) => { console.log(res)},
              error : (err:any) => {
                  if (err.status == 401){
                      localStorage.removeItem('token');
                      console.log(err);
                      this.router.navigateByUrl('/user/login');
                  }
              }
  })
      )
  }
  else
      return next.handle(request.clone()); 
  }
}
