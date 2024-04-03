import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';
import { AuthService } from '../security/auth.service';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private spinnerService: SpinnerService,
    private authService:AuthService
    ) { }


  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    const tokenReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      },
    });
    return next.handle(tokenReq).pipe(
      finalize(() => {
        this.spinnerService.hide();
      })
    );
  }
}