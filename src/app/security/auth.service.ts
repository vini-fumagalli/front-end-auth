// auth.service.ts
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  getExpiresAt() : string | null {
    return sessionStorage.getItem('expiresAt');
  }

  isLoggedIn(): boolean {
    
    const token = this.getToken();
    if(token === null) {
        sessionStorage.clear()
        return false;
    }

    const expiresAt = this.getExpiresAt();
    const expiresTime = expiresAt ? new Date(expiresAt) : null;
    const currentTime = new Date();
    if(expiresTime !== null && currentTime > expiresTime) {
        sessionStorage.clear();
        return false;
    }

    return true;
  }
}
