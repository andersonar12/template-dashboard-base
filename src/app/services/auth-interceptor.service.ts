
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    const tokenLiveGps = localStorage.getItem('tokenLiveGPS')!;
    const token = localStorage.getItem('token')!;

    let request = req;

    let url = request.url.split('//')[0]

    if (tokenLiveGps && url.indexOf('socketgpsv1') >= 0) {
      request = req.clone({
        setHeaders: { authorization: `Bearer ${ JSON.parse(tokenLiveGps).access_token }`}
      });
    }

    else if (token) {
      request = req.clone({
        setHeaders: { authorization: `Bearer ${ token }`}
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this.router.navigateByUrl('/auth/signin');
        }
        return throwError( err );

      })
    );

  }
}