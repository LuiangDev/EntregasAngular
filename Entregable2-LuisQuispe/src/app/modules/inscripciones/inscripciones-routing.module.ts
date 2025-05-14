import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaInscripcionesComponent } from './pages/lista-inscripciones/lista-inscripciones.component';
import { AbmInscripcionesComponent } from './pages/abm-inscripciones/abm-inscripciones.component';

const routes: Routes = [
  { path: '', component: ListaInscripcionesComponent },
  { path: 'abm', component: AbmInscripcionesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscripcionesRoutingModule { }
