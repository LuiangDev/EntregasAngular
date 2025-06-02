import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly ROLE_KEY = 'user_role';

  // Notificamos cambios de auth
  private readonly authStatusSource = new BehaviorSubject<boolean>(
    this.isLoggedIn()
  );
  authStatus$ = this.authStatusSource.asObservable();

  login(username: string, password: string, role: string): boolean {
    if (password === '12345') {
      localStorage.setItem(this.TOKEN_KEY, 'fake-jwt-token');
      localStorage.setItem(this.ROLE_KEY, role);
      this.authStatusSource.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    this.authStatusSource.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }
}
