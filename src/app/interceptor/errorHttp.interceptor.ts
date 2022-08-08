import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {    
    
    constructor(private router: Router){}

    intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
        return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            
            return throwError(() => new Error('test'));
          }))
    }

}
