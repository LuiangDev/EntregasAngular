import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
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
  isLargeScreen = window.innerWidth > 768;
  isLoggedIn = false;
  @ViewChild('drawer') drawer!: MatSidenav;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.actualizarLayout();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.actualizarLayout();
      });

    this.authService.authStatus$.subscribe(() => {
      this.actualizarLayout();
    });
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.isLargeScreen = window.innerWidth > 768;
  }

  private actualizarLayout(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    const rutaActual = this.router.url;
    this.mostrarLayout = rutaActual !== '/login' && this.isLoggedIn;
    this.isLargeScreen = window.innerWidth > 768;

    if (!this.isLoggedIn && this.drawer?.opened) {
      this.drawer.close();
    }
  }
}
