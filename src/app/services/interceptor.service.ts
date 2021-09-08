import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, LoginResponse } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userDetail: LoginResponse = this.authService.userDetail;
    if (userDetail && userDetail.accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `${userDetail.accessToken}`
        }
      });
    }
    return next.handle(req);
  }
}
