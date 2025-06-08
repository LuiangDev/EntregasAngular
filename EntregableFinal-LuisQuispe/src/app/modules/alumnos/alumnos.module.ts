import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosRoutingModule } from './alumnos-routing.module';

import { ListaAlumnosComponent } from './pages/lista-alumnos/lista-alumnos.component';
import { AbmAlumnosComponent } from './pages/abm-alumnos/abm-alumnos.component';

@NgModule({
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    ListaAlumnosComponent,
    AbmAlumnosComponent
  ],
})
export class AlumnosModule {}
