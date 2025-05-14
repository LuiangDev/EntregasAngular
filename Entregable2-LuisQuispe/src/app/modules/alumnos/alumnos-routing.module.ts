import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAlumnosComponent } from './pages/lista-alumnos/lista-alumnos.component';
import { AbmAlumnosComponent } from './pages/abm-alumnos/abm-alumnos.component';

const routes: Routes = [
  { path: '', component: ListaAlumnosComponent },
  { path: 'abm', component: AbmAlumnosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
