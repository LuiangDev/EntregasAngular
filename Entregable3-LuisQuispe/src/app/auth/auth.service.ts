import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly ROLE_KEY = 'user_role';

  login(username: string, password: string): boolean {
    // Prueba de autenticación simple
    if ((username === 'admin' || username === 'user') && password === '12345') {
      localStorage.setItem(this.TOKEN_KEY, 'fake-jwt-token');
      localStorage.setItem(this.ROLE_KEY, username === 'admin' ? 'admin' : 'user');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }
}
