import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly ROLE_KEY = 'user_role';
  private readonly USER_KEY = 'usuario';

  // Notificamos cambios de autenticación
  private readonly authStatusSource = new BehaviorSubject<boolean>(
    this.isLoggedIn()
  );
  authStatus$ = this.authStatusSource.asObservable();

  constructor() {}

  //Simulamos login y guardamos token, rol y usuario en localStorage
  login(username: string, password: string, role: string): boolean {
    if (password === '12345') {
      localStorage.setItem(this.TOKEN_KEY, 'fake-jwt-token');
      localStorage.setItem(this.ROLE_KEY, role);

const usuarioSimulado = {
  id: username === 'admin' ? 1 : 2,
  username: username,
  nombre: username,
  email: `${username}@correo.com`,
  perfil: role
};

      localStorage.setItem(this.USER_KEY, JSON.stringify(usuarioSimulado));

      this.authStatusSource.next(true);
      return true;
    }
    return false;
  }

  //Cerramos sesión y eliminamos token, rol y usuario del localStorage
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.authStatusSource.next(false);
  }

  //Validamos si el usuario está logueado
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  //Retornamos el token de autenticación
  getUserRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }

  //Retornamos el usuario logueado
  getUsuario() {
    const usuarioJSON = localStorage.getItem(this.USER_KEY);
    return usuarioJSON ? JSON.parse(usuarioJSON) : null;
  }

  //Retornamos el nombre de usuario
getUsername(): string | null {
  const usuario = localStorage.getItem('usuario');
  if (usuario) {
    const parsed = JSON.parse(usuario);
    return parsed?.username ?? null;
  }
  return null;
}



  getUserId(): number | null {
    const usuarioStr = localStorage.getItem('usuario');
    if (usuarioStr) {
      try {
        const usuario = JSON.parse(usuarioStr);
        return usuario?.id ?? null;
      } catch (error) {
        console.warn('Error al parsear el usuario del localStorage', error);
        return null;
      }
    }
    return null;
  }
}
