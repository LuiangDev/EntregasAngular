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

    // Permitimos acceso dependiendo del rol actual
    if (currentRole === expectedRole) {
      return true;
    }

    // User accede a alumnos y cursos
    if (
      currentRole === 'user' &&
      (route.routeConfig?.path === 'alumnos' ||
        route.routeConfig?.path === 'cursos' ||
        route.routeConfig?.path === 'inscripciones')
    ) {
      return true;
    }

    // Redirigimos según el rol
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
