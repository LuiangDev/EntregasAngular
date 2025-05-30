import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSidenavModule, MatListModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  // Obtenemos el rol o nombre del usuario
  getUserName(): string {
    const role = this.authService.getUserRole();
    return role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Invitado';
  }

  // Cerrar sesión
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
