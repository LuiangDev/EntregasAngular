import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosRoutingModule } from './usuarios-routing.module';

import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { AbmUsuariosComponent } from './pages/abm-usuarios/abm-usuarios.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsuariosRoutingModule,
    ListaUsuariosComponent,
    AbmUsuariosComponent,
  ],
})
export class UsuariosModule {}
