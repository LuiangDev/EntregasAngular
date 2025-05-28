import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';

export const routes: Routes = [

    { path: 'login', component: LoginComponent },
  {
    path: 'alumnos',
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'admin' },
    loadChildren: () => import('./modules/alumnos/alumnos.module').then(m => m.AlumnosModule)
  },
  {
    path: 'cursos',
    loadChildren: () =>
      import('./modules/cursos/cursos.module').then((m) => m.CursosModule),
  },
  {
    path: 'inscripciones',
    loadChildren: () =>
      import('./modules/inscripciones/inscripciones.module').then(
        (m) => m.InscripcionesModule
      ),
  },
  { path: '', redirectTo: 'alumnos', pathMatch: 'full' },
  { path: '**', redirectTo: 'alumnos' },
  { path: '**', redirectTo: 'login' },
];
