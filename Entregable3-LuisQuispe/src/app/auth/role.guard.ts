import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const currentRole = this.authService.getUserRole();

    if (currentRole === expectedRole) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
