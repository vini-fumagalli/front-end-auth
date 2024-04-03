// auth.service.ts
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

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
    const expiresTime = expiresAt ? new Date(expiresAt).getTime() : null;
    if(expiresTime !== null && Date.now() > expiresTime) {
        sessionStorage.clear();
        return false;
    }

    return true;
  }
}