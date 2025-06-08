import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosRoutingModule } from './cursos-routing.module';

import { ListaCursosComponent } from './pages/lista-cursos/lista-cursos.component';
import { AbmCursosComponent } from './pages/abm-cursos/abm-cursos.component';

@NgModule({
  imports: [
    CommonModule,
    CursosRoutingModule,
    ListaCursosComponent,
    AbmCursosComponent
  ],
})
export class CursosModule {}
