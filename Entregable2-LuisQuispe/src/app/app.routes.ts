import { Routes } from '@angular/router';
import { ListaAlumnosComponent } from './modules/alumnos/pages/lista-alumnos/lista-alumnos.component';
import { AbmAlumnosComponent } from './modules/alumnos/pages/abm-alumnos/abm-alumnos.component';

export const routes: Routes = [
  { path: 'alumnos', component: ListaAlumnosComponent },
  { path: 'alumnos/abm', component: AbmAlumnosComponent },
  { path: '**', redirectTo: 'alumnos' }
];
