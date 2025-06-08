import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() sidenav!: MatSidenav;

  isLoggedIn = false;
  role: string | null = null;
  usuarioNombre: string | null = null;

  private authSubscription!: Subscription;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authStatus$.subscribe(() => {
      this.actualizarEstadoUsuario();
    });

    this.actualizarEstadoUsuario();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  actualizarEstadoUsuario(): void {
    const usuario = this.authService.getUsuario();
    this.isLoggedIn = !!usuario;
    this.role = usuario?.perfil ?? null;
    this.usuarioNombre = usuario?.nombre ?? null;
  }

  logout(): void {
    this.authService.logout();

    this.router.navigate(['/login']).then(() => {
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'));
      });
    });
  }

  navegarYcerrar(ruta: string): void {
    this.router.navigate([ruta]);
    if (window.innerWidth <= 768 && this.sidenav?.opened) {
      this.sidenav.close();
    }
  }
}
