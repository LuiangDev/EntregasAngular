import { Routes } from '@angular/router';
import { ListaAlumnosComponent } from './modules/alumnos/pages/lista-alumnos/lista-alumnos.component';
import { AbmAlumnosComponent } from './modules/alumnos/pages/abm-alumnos/abm-alumnos.component';

export const routes: Routes = [
  {
    path: 'alumnos',
    loadChildren: () =>
      import('./modules/alumnos/alumnos.module').then((m) => m.AlumnosModule),
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
];
