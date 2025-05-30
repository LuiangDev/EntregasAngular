import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { NombreCompletoPipe } from '../../../../shared/pipes/nombre-completo.pipe';
import { AlumnosService } from '../../services/alumnos.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Titulo20Directive } from '../../../../shared/directives/titulo20.directive';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [CommonModule, MatTableModule, NombreCompletoPipe, Titulo20Directive],
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss'],
})
export class ListaAlumnosComponent implements OnInit {
  alumnos: any[] = [];
  displayedColumns: string[] = ['nombreCompleto', 'email', 'acciones'];


  constructor(
    private readonly alumnosService: AlumnosService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

    esAdmin(): boolean {
  return this.authService.getUserRole() === 'admin';
}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.alumnosService.obtenerAlumnos().subscribe((data) => {
      this.alumnos = data;
    });
  }

  agregarAlumno(): void {
    this.alumnosService.limpiarAlumnoSeleccionado();
    this.router.navigate(['/alumnos/abm']);
  }

  editarAlumno(alumno: any): void {
    this.alumnosService.seleccionarAlumno(alumno, alumno.id);
    this.router.navigate(['/alumnos/abm']);
  }

  eliminarAlumno(alumno: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al alumno de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.alumnosService.eliminarAlumno(alumno.id).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Alumno eliminado',
            text: 'El alumno fue eliminado correctamente.',
            timer: 1500,
            showConfirmButton: false
          });
          this.cargarAlumnos(); // Recargamos el listado de alumnos
        });
      }
    });
  }

}
