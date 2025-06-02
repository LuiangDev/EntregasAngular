import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  role: string | null = null;
  isLoggedIn = false;
  private authSubscription!: Subscription;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.actualizarEstadoUsuario();
    // Cambios en login/logout
    this.authSubscription = this.authService.authStatus$.subscribe(() => {
      this.actualizarEstadoUsuario();
    });
  }

ngOnDestroy(): void {
  if (this.authSubscription) {
    this.authSubscription.unsubscribe();
  }
}


  getUserName(): string {
    return this.role ? this.role.charAt(0).toUpperCase() + this.role.slice(1) : 'Invitado';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  actualizarEstadoUsuario(): void {
    this.role = this.authService.getUserRole();
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
