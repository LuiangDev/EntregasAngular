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
    const expectedRoles = route.data['roles'] as string[];
    const currentRole = this.authService.getUserRole();

    if (expectedRoles?.includes(currentRole ?? '')) {
      return true;
    }

    // Redirección según rol
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
