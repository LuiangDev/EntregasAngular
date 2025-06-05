import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { AbmUsuariosComponent } from './pages/abm-usuarios/abm-usuarios.component';
import { RoleGuard } from '../../auth/role.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [RoleGuard],
    data: { expectedRole: 'admin' },
    children: [
      { path: '', component: ListaUsuariosComponent },
      { path: 'crear', component: AbmUsuariosComponent },
      { path: 'editar/:id', component: AbmUsuariosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule {}
