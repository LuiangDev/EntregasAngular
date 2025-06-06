import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { AbmUsuariosComponent } from './pages/abm-usuarios/abm-usuarios.component';
import { RoleGuard } from '../../auth/role.guard';

const routes: Routes = [
  {
    path: '',
    component: ListaUsuariosComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'crear',
    component: AbmUsuariosComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'editar/:id',
    component: AbmUsuariosComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'admin' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
