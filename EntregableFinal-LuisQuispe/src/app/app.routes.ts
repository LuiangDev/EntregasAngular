import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'alumnos',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'user'] },
    loadChildren: () =>
      import('./modules/alumnos/alumnos.module').then((m) => m.AlumnosModule),
  },
  {
    path: 'cursos',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'user'] },
    loadChildren: () =>
      import('./modules/cursos/cursos.module').then((m) => m.CursosModule),
  },
  {
    path: 'inscripciones',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/inscripciones/inscripciones.module').then(
        (m) => m.InscripcionesModule
      ),
  },
  {
    path: 'usuarios',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] },
    loadChildren: () =>
      import('./modules/usuarios/usuarios.module').then(
        (m) => m.UsuariosModule
      ),
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
