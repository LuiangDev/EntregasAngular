import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Usuario } from '../shared/models/usuario.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_KEY = 'usuario';
  private readonly apiUrl = 'http://localhost:3000/usuarios';

  private readonly authStatusSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public authStatus$ = this.authStatusSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string): Observable<Usuario> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}`).pipe(
      map((usuarios) => {
        const usuario = usuarios[0];
        if (!usuario) throw new Error('Usuario no encontrado');
        if (usuario.password !== password) throw new Error('Contraseña incorrecta');

        localStorage.setItem(this.USER_KEY, JSON.stringify(usuario));
        this.authStatusSubject.next(true);
        return usuario;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
    this.authStatusSubject.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.USER_KEY);
  }

  getUsuario(): Usuario | null {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  getUserRole(): string | null {
    return this.getUsuario()?.perfil ?? null;
  }

  getUserId(): string | null {
    return this.getUsuario()?.id ?? null;
  }

  getUsername(): string | null {
    return this.getUsuario()?.nombre ?? null;
  }

  getEmail(): string | null {
    return this.getUsuario()?.email ?? null;
  }
}
