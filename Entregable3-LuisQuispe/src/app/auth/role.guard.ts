import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const currentRole = this.authService.getUserRole();

    if (currentRole === expectedRole) {
      return true;
    } else {
      // Redirigimos según el rol actual
      if (currentRole === 'user') {
        this.router.navigate(['/inscripciones']);
      } else if (currentRole === 'admin') {
        this.router.navigate(['/alumnos']);
      } else {
        this.router.navigate(['/login']);
      }
      return false;
    }
  }
}
