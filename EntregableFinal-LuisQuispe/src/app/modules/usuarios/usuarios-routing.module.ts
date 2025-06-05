import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/auth/role.guard';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { AbmUsuariosComponent } from './pages/abm-usuarios/abm-usuarios.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [RoleGuard],
    data: { expectedRole: 'admin' },
    children: [
      { path: '', component: ListaUsuariosComponent },
      { path: 'editar/:id', component: AbmUsuariosComponent },
      { path: 'crear', component: AbmUsuariosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule {}
