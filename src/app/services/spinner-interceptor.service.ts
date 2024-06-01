import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';
import { AuthService } from '../security/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private spinnerService: SpinnerService,
    private authService:AuthService,
    private router:Router,
    private msgService:MessageService
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
      // catchError((err: HttpErrorResponse) => {
      //   return this.handlerError(err);
      // }),
      finalize(() => {
        this.spinnerService.hide();
      })
    );
  }

  // handlerError(err: HttpErrorResponse) {
  //   if(err.status === 401) {
  //     this.router.navigate(['/login']);
  //     sessionStorage.clear();
  //     this.msgService.add({ severity:'warn', summary:'Aviso', detail:'Sua sessão expirou. Faça login novamente'});
  //   }

  //   if(err.status === 403) {
  //     this.msgService.add({ severity:'error', summary:'Aviso', detail:'Você não tem permissão para isso'});
  //   }

  //   if(err.status === 500) {
  //     this.msgService.add({ severity:'error', summary:'Erro', detail:'Ocorrerão erros. Tente novamente ou contate o suporte'});
  //   }

  //   if(err.status === 400) {
  //     this.msgService.add({ severity:'error', summary:'Erro', detail:'Informações mal inseridas'});
  //   }

  //   return throwError(() => new Error('Ocorreu um erro'));
  // }
}