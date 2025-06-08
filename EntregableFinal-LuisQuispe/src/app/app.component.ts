import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AuthService } from './auth/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    NavbarComponent,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'PFQuispe';
  mostrarLayout = true;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  isLargeScreen = window.innerWidth > 768;

ngOnInit(): void {
  this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      const rutaActual = event.url;
      this.mostrarLayout =
        rutaActual !== '/login' && this.authService.isLoggedIn();
    });

  this.authService.authStatus$.subscribe((status) => {
    const rutaActual = this.router.url;
    this.mostrarLayout = rutaActual !== '/login' && status;
  });

  // Escuchar cambios de tamaño
  window.addEventListener('resize', () => {
    this.isLargeScreen = window.innerWidth > 768;
  });
}
}
