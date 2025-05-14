import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaCursosComponent } from './pages/lista-cursos/lista-cursos.component';
import { AbmCursosComponent } from './pages/abm-cursos/abm-cursos.component';

const routes: Routes = [
  { path: '', component: ListaCursosComponent },
  { path: 'abm', component: AbmCursosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
