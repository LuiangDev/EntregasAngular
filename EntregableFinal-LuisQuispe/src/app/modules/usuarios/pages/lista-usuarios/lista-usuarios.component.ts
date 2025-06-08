import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../../../shared/models/usuario.model';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  eliminarUsuario(id: string | undefined): void {
    if (!id) return;

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el usuario de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.deleteUsuario(id).subscribe(() => {
          this.usuarios = this.usuarios.filter((u) => u.id !== id);

          Swal.fire({
            title: 'Eliminado',
            text: 'El usuario fue eliminado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        });
      }
    });
  }

  editarUsuario(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/usuarios/editar', id]);
    }
  }
}
