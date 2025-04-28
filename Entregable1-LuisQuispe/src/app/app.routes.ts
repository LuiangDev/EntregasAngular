import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'alumnos',
    loadChildren: () =>
      import('./modules/alumnos/alumnos.module').then(m => m.AlumnosModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'alumnos'
  },
  {
    path: '**',
    redirectTo: 'alumnos'
  }
];
