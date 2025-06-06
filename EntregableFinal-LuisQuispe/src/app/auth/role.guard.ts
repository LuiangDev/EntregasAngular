import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'] as string[];
    const currentRole = this.authService.getUserRole();
    const currentUrl = this.router.url;

    if (expectedRoles?.includes(currentRole ?? '')) {
      return true;
    }

    if (currentRole === 'user' && currentUrl !== '/inscripciones') {
      this.router.navigate(['/inscripciones']);
    } else if (currentRole === 'admin' && currentUrl !== '/alumnos') {
      this.router.navigate(['/alumnos']);
    } else if (!currentRole && currentUrl !== '/login') {
      this.router.navigate(['/login']);
    }

    return false;
  }
}
