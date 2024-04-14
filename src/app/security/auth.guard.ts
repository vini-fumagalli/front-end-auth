// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService, 
    private router: Router,
    private msgService:MessageService
    ) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']); 
      this.msgService.add({ severity:'warn', summary:'Aviso', detail:'Sua sessão expirou. Faça login novamente'});
      return false;
    }
    return true;
  }
}
