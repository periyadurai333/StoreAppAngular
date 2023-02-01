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
    

    if (localStorage.getItem('token') != null) {
      const clonedReq = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      });
      return next.handle(clonedReq).pipe(
          tap({
              next :(res:any) => { },
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
